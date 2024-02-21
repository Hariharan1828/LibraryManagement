# Use an official OpenJDK runtime as a base image
FROM openjdk:21
ARG JAR_FILE=target/*.jar
COPY ./target/Library-Management-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]
