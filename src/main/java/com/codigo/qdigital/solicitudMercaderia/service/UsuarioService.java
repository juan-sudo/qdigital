package com.codigo.qdigital.solicitudMercaderia.service;


import com.codigo.qdigital.solicitudMercaderia.entity.UsuarioEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UsuarioService {
    UserDetailsService userDetailService();
    List<UsuarioEntity> getUsuarios();


}
