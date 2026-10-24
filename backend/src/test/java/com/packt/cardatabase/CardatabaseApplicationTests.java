package com.packt.cardatabase;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import com.packt.cardatabase.web.CarController;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class CardatabaseApplicationTests {

    @Autowired
    private CarController controller;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("Spring context creates the car controller")
    void contextLoads() {
        assertThat(port).isPositive();
        assertThat(controller).isNotNull();
    }

    @Test
    void manualCarsEndpointReturnsSeededCars() {
        ResponseEntity<String> response = authorizedGet("/cars");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Ford", "Mustang", "Nissan", "Toyota");
    }

    @Test
    void repositorySearchEndpointFindsFord() {
        ResponseEntity<String> response = authorizedGet("/api/cars/search/findByBrand?brand=Ford");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Ford", "Mustang").doesNotContain("Nissan", "Toyota");
    }

    @Test
    void apiRootAndOpenApiDocumentAreAvailable() {
        ResponseEntity<String> api = authorizedGet("/api");
        ResponseEntity<String> openApi = restTemplate.getForEntity(url("/api-docs"), String.class);

        assertThat(api.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(api.getBody()).contains("cars", "owners");
        assertThat(openApi.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(openApi.getBody()).contains("Car REST API", "openapi", "bearerAuth", "/login");
        assertThat(api.getBody()).doesNotContain("appUsers");
    }

    @Test
    void swaggerUiIsPublicWhileDataApiRequiresJwt() {
        ResponseEntity<String> swagger = restTemplate.getForEntity(url("/swagger-ui/index.html"), String.class);
        assertThat(swagger.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(swagger.getBody()).contains("Swagger UI");
        assertThat(restTemplate.getForEntity(url("/api/cars"), String.class).getStatusCode())
                .isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void loginRequiresValidCredentialsAndProtectsApi() throws Exception {
        assertThat(restTemplate.getForEntity(url("/api"), String.class).getStatusCode())
                .isEqualTo(HttpStatus.UNAUTHORIZED);
        HttpRequest invalidLogin = HttpRequest.newBuilder(URI.create(url("/login")))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString("{\"username\":\"user\",\"password\":\"wrong\"}"))
                .build();
        assertThat(HttpClient.newHttpClient().send(invalidLogin, HttpResponse.BodyHandlers.ofString())
                .statusCode()).isEqualTo(401);
        assertThat(restTemplate.postForEntity(url("/login"), credentials("user", "user"), String.class)
                .getHeaders().getFirst(HttpHeaders.AUTHORIZATION)).startsWith("Bearer ");
    }

    @Test
    void invalidTokenAndUserRepositoryAreNotAccessible() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("bad-token");
        ResponseEntity<String> invalid = restTemplate.exchange(url("/cars"), HttpMethod.GET,
                new HttpEntity<>(headers), String.class);
        assertThat(invalid.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(authorizedGet("/api/appUsers").getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void corsPreflightAllowsAuthorizationHeader() throws Exception {
        HttpRequest preflight = HttpRequest.newBuilder(URI.create(url("/api/cars")))
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "GET")
                .header("Access-Control-Request-Headers", "authorization")
                .method("OPTIONS", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(
                preflight, HttpResponse.BodyHandlers.ofString());
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.headers().firstValue("Access-Control-Allow-Origin")).contains("*");
        assertThat(response.headers().firstValue("Access-Control-Allow-Headers")).contains("authorization");
    }

    @Test
    void userCanReadButOnlyAdminCanChangeData() {
        assertThat(authorizedGet("/api/owners").getStatusCode()).isEqualTo(HttpStatus.OK);

        HttpHeaders userHeaders = authHeaders("user", "user");
        userHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> userCreate = new HttpEntity<>(
                "{\"firstname\":\"Role\",\"lastname\":\"Check\"}", userHeaders);
        assertThat(restTemplate.exchange(url("/api/owners"), HttpMethod.POST,
                userCreate, String.class).getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);

        HttpHeaders adminHeaders = authHeaders("admin", "admin");
        adminHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> adminCreate = new HttpEntity<>(
                "{\"firstname\":\"Role\",\"lastname\":\"Check\"}", adminHeaders);
        ResponseEntity<String> created = restTemplate.exchange(url("/api/owners"), HttpMethod.POST,
                adminCreate, String.class);
        assertThat(created.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(created.getHeaders().getLocation()).isNotNull();

        String ownerUrl = created.getHeaders().getLocation().toString();
        assertThat(restTemplate.exchange(ownerUrl, HttpMethod.GET,
                new HttpEntity<>(adminHeaders), String.class).getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(restTemplate.exchange(ownerUrl, HttpMethod.DELETE,
                new HttpEntity<>(userHeaders), String.class).getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
        assertThat(restTemplate.exchange(ownerUrl, HttpMethod.DELETE,
                new HttpEntity<>(adminHeaders), String.class).getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(restTemplate.exchange(ownerUrl, HttpMethod.GET,
                new HttpEntity<>(adminHeaders), String.class).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<String> authorizedGet(String path) {
        return restTemplate.exchange(url(path), HttpMethod.GET,
                new HttpEntity<>(authHeaders("user", "user")), String.class);
    }

    private HttpHeaders authHeaders(String username, String password) {
        ResponseEntity<String> login = restTemplate.postForEntity(
                url("/login"), credentials(username, password), String.class);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, login.getHeaders().getFirst(HttpHeaders.AUTHORIZATION));
        return headers;
    }

    private HttpEntity<String> credentials(String username, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}", headers);
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }
}
