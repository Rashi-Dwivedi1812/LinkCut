package routes

import (
	"Url-Shortener/database"
	"Url-Shortener/helpers"
	"fmt"
	"os"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)


type request struct{
	URL string       `json:"url"`
	CustomShort string    `json:"short"`
	Expiry time.Duration   `json:"expiry"`
}

type response struct{ 
	URL           string          `json:"url"`
	CustomShort   string          `json:"short"`
	Expiry        time.Duration`json:"expiry"`
}

func ShortenURL(c *fiber.Ctx) error {
	body := new(request)

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	if !govalidator.IsURL(body.URL) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid URL"})
	}

	if !helpers.RemoveDomainError(body.URL) {
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "haha... nice try"})
	}

	body.URL = helpers.EnforceHTTP(body.URL)

	var id string
	if body.CustomShort == "" {
		id = uuid.New().String()[:6]
	} else {
		id = body.CustomShort
	}

	r := database.CreateClient(0)
defer r.Close()

val, err := r.Get(database.Ctx, id).Result()
if err != nil && err != redis.Nil {
	fmt.Println("Redis GET error:", err)
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": "Redis error while checking existing key",
	})
}

if val != "" {
    return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
        "error": "URL custom short is already in use",
    })
}


	if body.Expiry == 0 {
		body.Expiry = 24
	}
	
	err = r.Set(database.Ctx, id, body.URL, body.Expiry*3600*time.Second).Err()
if err != nil {
	fmt.Println("Redis SET error:", err)
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": "unable to connect to the server",
	})
}

	resp := response{
		URL:         body.URL,
		CustomShort: os.Getenv("DOMAIN") + "/" + id,
		Expiry:      body.Expiry,
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}