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
	app.Get("/:url", routes.ResolveURL)
	app.Post("/:short", routes.ShortenURL)
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	app := fiber.New()

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowHeaders: "Origin, Content-Type, Accept",
    AllowMethods: "GET,POST,OPTIONS",
}))
fmt.Println("CORS middleware loaded ✅") 


	setupRoutes(app)

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "0.0.0.0:3000"
	}
	log.Fatal(app.Listen(port))
}
