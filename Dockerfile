# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y bash && mvn clean install

# Stage 2: Create the runtime image
FROM openjdk:17
VOLUME /tmp
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8081
