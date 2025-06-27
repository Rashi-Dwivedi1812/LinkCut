# Stage 1: Build the Go app
FROM golang:alpine AS builder

# Create working directory
RUN mkdir /build
WORKDIR /build

# Copy source code
COPY . .

# Build the Go binary
RUN go build -o main .

# Stage 2: Create a lightweight image to run the binary
FROM alpine

# Create an unprivileged user
RUN adduser -S -D -H -h /app appuser

# Set working directory
WORKDIR /app

# Copy the built binary from builder
COPY --from=builder /build/main .

# Change user
USER appuser

# Expose port
EXPOSE 3000

# Command to run
CMD ["./main"]
