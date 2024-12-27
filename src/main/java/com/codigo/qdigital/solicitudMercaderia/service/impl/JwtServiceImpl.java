package com.codigo.qdigital.solicitudMercaderia.service.impl;


import com.codigo.qdigital.solicitudMercaderia.entity.UsuarioEntity;
import com.codigo.qdigital.solicitudMercaderia.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${key.signature}")
    private String keySignature;
    @Override
    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    ///Generar un TOKEN
    @Override
    public String generateToken(UserDetails userDetails) {
       if (!(userDetails instanceof UsuarioEntity)) {
            throw new IllegalArgumentException("El objeto UserDetails no es de tipo Usuario");
        }

        UsuarioEntity usuario = (UsuarioEntity) userDetails;

        String nombreCompleto = capitalizar(usuario.getNombres()) + " " +
                capitalizar(usuario.getApellidoPaterno()) + " " +
                capitalizar(usuario.getApellidoMaterno());

        // Obtener los nombres de los roles
        Set<String> roles = usuario.getRolesNames();
        return Jwts.builder().
                setSubject(userDetails.getUsername())
                .claim("roles", roles) // Añadir roles al payload
                .claim("nombreCompleto", nombreCompleto)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1200000))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private String capitalizar(String texto) {
        if (texto == null || texto.isEmpty()) {
            return texto;
        }
        return texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();
    }




    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    //Metodo que te deveuvle la clave con la que se firma el token.
    private Key getSignKey(){
        byte[] key = Decoders.BASE64.decode(keySignature);
        return Keys.hmacShaKeyFor(key);
    }
    //Metodo apra extraer el Payload del token, requiere firmarse para poder acceder al contenido.
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    //Metodo que te deeuvle un objeto del body o tambien denomidado un Claim
    private <T> T extractClaims(String token, Function<Claims,T> claimResult){
        final Claims claims = extractAllClaims(token);
        return claimResult.apply(claims);
    }

    //Metodo para validar el token
    private boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }


}
