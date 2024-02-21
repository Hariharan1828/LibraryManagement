# Use an official OpenJDK runtime as a base image
FROM openjdk:21
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8081
