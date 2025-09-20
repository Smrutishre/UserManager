# Use official Eclipse Temurin JDK 17 (LTS) as base image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first (to leverage Docker layer caching)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline -B


# Copy the source code
COPY src ./src

# Build the application (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (default for Spring Boot)
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]
