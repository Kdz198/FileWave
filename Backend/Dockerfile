FROM amazoncorretto:21
WORKDIR /app

COPY . .

RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080
CMD ["java", "-jar", "target/FileWave-0.0.1-SNAPSHOT.jar"]