package com.codigo.qdigital.solicitudMercaderia.service;


;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SignInRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SignUpRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.AuthenticationResponse;
import com.codigo.qdigital.solicitudMercaderia.entity.UsuarioEntity;

import java.util.List;

public interface AuthenticationService {
    UsuarioEntity signUpUser(SignUpRequest signUpRequest);
    UsuarioEntity signUpAdmin(SignUpRequest signUpRequest);
    List<UsuarioEntity> todos();
    AuthenticationResponse signin(SignInRequest signInRequest);
    boolean validateToken(String token);

    UsuarioEntity getUserDetailsByUsername(String username);

}

