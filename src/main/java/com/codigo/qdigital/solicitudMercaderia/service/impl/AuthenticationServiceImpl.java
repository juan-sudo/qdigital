package com.codigo.qdigital.solicitudMercaderia.service.impl;


import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SignInRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SignUpRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.AuthenticationResponse;
import com.codigo.qdigital.solicitudMercaderia.entity.RolEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.Role;
import com.codigo.qdigital.solicitudMercaderia.entity.UsuarioEntity;
import com.codigo.qdigital.solicitudMercaderia.repository.RolRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.UsuarioRepository;
import com.codigo.qdigital.solicitudMercaderia.service.AuthenticationService;
import com.codigo.qdigital.solicitudMercaderia.service.JwtService;
import com.codigo.qdigital.solicitudMercaderia.service.UsuarioService;
import com.codigo.qdigital.solicitudMercaderia.util.AppUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioService usuarioService;
    private String generarColorAleatorio() {
        int color = (int) (Math.random() * 0xFFFFFF);
        return String.format("#%06X", color);
    }


    // Método para obtener los detalles del usuario por nombre de usuario
    public UsuarioEntity getUserDetailsByUsername(String username) {
        return usuarioRepository.findByEmail(username) // Asumiendo que el username es el correo
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
    @Transactional
    @Override
    public UsuarioEntity signUpUser(SignUpRequest signUpRequest) {
        UsuarioEntity usuario = new UsuarioEntity();

            usuario.setNombres(signUpRequest.getNombres());
            usuario.setApellidoPaterno(signUpRequest.getApellidoPaterno());
            usuario.setApellidoMaterno(signUpRequest.getApellidoMaterno());
            usuario.setEmail(signUpRequest.getEmail());
            usuario.setTelefono(signUpRequest.getTelefono());
            usuario.setDireccion(signUpRequest.getDireccion());
            usuario.setFechaNacimiento(signUpRequest.getFechaNacimiento());
            usuario.setGenero(signUpRequest.getGenero());
            usuario.setFechaRegistro(new Date());
            usuario.setActivo(true);
            usuario.setBackgroundUser(generarColorAleatorio());

            Set<RolEntity> assginedRoles = new HashSet<>();
            RolEntity userRol = rolRepository.findByNombreRol(Role.USUARIO.name()).orElseThrow(() -> new RuntimeException("EL ROL NO EXISTE, REVISA TU BD"));
          //   Rol userRol2 = rolRepository.findByNombreRol(Role.GESTOR.name()).orElseThrow(() -> new RuntimeException("EL ROL NO EXISTE, REVISA TU BD"));
            assginedRoles.add(userRol);
            // assginedRoles.add(userRol2);
            usuario.setRoles(assginedRoles);

            //HASH AL PASSWORD PENDIENTE
            usuario.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));



        return usuarioRepository.save(usuario);
    }

    @Transactional
    @Override
    public UsuarioEntity signUpAdmin(SignUpRequest signUpRequest) {
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setNombres(signUpRequest.getNombres());
        usuario.setApellidoPaterno(signUpRequest.getApellidoPaterno());
        usuario.setApellidoMaterno(signUpRequest.getApellidoMaterno());
        usuario.setEmail(signUpRequest.getEmail());
        usuario.setTelefono(signUpRequest.getTelefono());
        usuario.setDireccion(signUpRequest.getDireccion());
        usuario.setFechaNacimiento(signUpRequest.getFechaNacimiento());
        usuario.setGenero(signUpRequest.getGenero());
        usuario.setFechaRegistro(new Date());
        usuario.setActivo(true);
        usuario.setBackgroundUser(generarColorAleatorio());
        Set<RolEntity> assginedRoles = new HashSet<>();
        RolEntity userRol = rolRepository.findByNombreRol(Role.ADMINISTRADOR.name()).orElseThrow(() -> new RuntimeException("EL ROL NO EXISTE, REVISA TU BD"));
        //Rol userRol2 = rolRepository.findByNombreRol(Role.DESARROLLADOR.name()).orElseThrow(() -> new RuntimeException("EL ROL NO EXISTE, REVISA TU BD"));
        assginedRoles.add(userRol);
       // assginedRoles.add(userRol2);
        usuario.setRoles(assginedRoles);
        //HASH AL PASSWORD PENDIENTE
        usuario.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<UsuarioEntity> todos() {
        return usuarioRepository.findAll();
    }

    @Override
    public AuthenticationResponse signin(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),signInRequest.getPassword()));
        var user = usuarioRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email no valido"));

        var token = jwtService.generateToken(user);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(token);
        return authenticationResponse;
    }

    @Override
    public boolean validateToken(String token) {
        final String jwt;
        final String userEmail;
        if(AppUtil.isNotNullOrEmpty(token)){
            jwt =  token.substring(7);
            userEmail = jwtService.extractUserName(jwt);
            if (AppUtil.isNotNullOrEmpty(userEmail)){
                UserDetails userDetails = usuarioService.userDetailService().loadUserByUsername(userEmail);
                return jwtService.validateToken(jwt,userDetails);
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
}
