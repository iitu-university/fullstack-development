package com.packt.cardatabase;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.packt.cardatabase.service.JwtService;
import com.packt.cardatabase.service.UserDetailsServiceImpl;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPoint entryPoint;

    public AuthenticationFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService,
            AuthEntryPoint entryPoint) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.entryPoint = entryPoint;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null) {
            if (!header.startsWith("Bearer ") || header.substring(7).isBlank()) {
                entryPoint.commence(request, response, new BadCredentialsException("Invalid bearer token"));
                return;
            }
            try {
                String username = jwtService.getAuthUser(header.substring(7));
                if (username == null || username.isBlank()) {
                    throw new BadCredentialsException("Invalid bearer token");
                }
                UserDetails user = userDetailsService.loadUserByUsername(username);
                var authentication = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException | IllegalArgumentException | org.springframework.security.core.AuthenticationException ex) {
                SecurityContextHolder.clearContext();
                entryPoint.commence(request, response, new BadCredentialsException("Invalid bearer token", ex));
                return;
            }
        }
        chain.doFilter(request, response);
    }
}
