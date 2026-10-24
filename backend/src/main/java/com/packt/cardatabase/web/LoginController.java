package com.packt.cardatabase.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.AccountCredentials;
import com.packt.cardatabase.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;

@RestController
public class LoginController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public LoginController(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Operation(summary = "Войти и получить JWT",
            description = "Токен возвращается в заголовке Authorization. Скопируйте часть после 'Bearer ' в Swagger Authorize.")
    @SecurityRequirements
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody AccountCredentials credentials) {
        var request = new UsernamePasswordAuthenticationToken(
                credentials.username(), credentials.password());
        var authentication = authenticationManager.authenticate(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtService.getToken(authentication.getName()))
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.AUTHORIZATION)
                .build();
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> authenticationFailed() {
        return ResponseEntity.status(401).contentType(MediaType.APPLICATION_JSON)
                .body("{\"error\":\"Unauthorized\"}");
    }
}
