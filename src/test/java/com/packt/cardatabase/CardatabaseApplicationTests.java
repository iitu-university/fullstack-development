package com.packt.cardatabase;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class CardatabaseApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void contextLoads() {
        assertThat(port).isPositive();
    }

    @Test
    void manualCarsEndpointReturnsSeededCars() {
        ResponseEntity<String> response = restTemplate.getForEntity(url("/cars"), String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Ford", "Mustang", "Nissan", "Toyota");
    }

    @Test
    void repositorySearchEndpointFindsFord() {
        ResponseEntity<String> response = restTemplate.getForEntity(
                url("/api/cars/search/findByBrand?brand=Ford"), String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Ford", "Mustang").doesNotContain("Nissan", "Toyota");
    }

    @Test
    void apiRootAndOpenApiDocumentAreAvailable() {
        ResponseEntity<String> api = restTemplate.getForEntity(url("/api"), String.class);
        ResponseEntity<String> openApi = restTemplate.getForEntity(url("/api-docs"), String.class);

        assertThat(api.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(api.getBody()).contains("cars", "owners");
        assertThat(openApi.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(openApi.getBody()).contains("Car REST API", "openapi");
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }
}
