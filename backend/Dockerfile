FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/ecommerce-shop-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5454

ENTRYPOINT ["java","-jar","app.jar"]