package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsuarioDTO {
    private Long id;
    private String nombres;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String email;
    private String numDoc;
    private String telefono;
    private String direccion;
    private Date fechaRegistro;
    private Boolean activo;
    private String urlImagen;
    private List<RolDTO> roles; // Lista de nombres de roles para simplificar
}
