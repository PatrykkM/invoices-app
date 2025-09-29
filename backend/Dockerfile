FROM gradle:8-jdk21 AS builder
WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

RUN ./gradlew dependencies --no-daemon || true

COPY src ./src

RUN ./gradlew bootJar --no-daemon -x test

FROM eclipse-temurin:21-jre
WORKDIR /app

ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB}
ENV SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
ENV SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
