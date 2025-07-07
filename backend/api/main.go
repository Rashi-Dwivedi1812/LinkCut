package main

import (
	"Url-Shortener/routes"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/:url", routes.ResolveURL)
	api.Post("/:short", routes.ShortenURL)
}


func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	app := fiber.New()

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:5173",
    AllowHeaders: "Origin, Content-Type, Accept",
    AllowMethods: "GET, POST, OPTIONS",
}))
	
fmt.Println("CORS middleware loaded ✅") 

app.Options("/*", func(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
})


	setupRoutes(app)

port := os.Getenv("APP_PORT")
if port == "" {
	port = ":3000"
}

fmt.Println("🚀 Server starting on", port)
err = app.Listen(port)
if err != nil {
	log.Fatalf("❌ Failed to start server: %v", err)
}


}
