# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jdk-alpine
COPY ./target/*.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]
