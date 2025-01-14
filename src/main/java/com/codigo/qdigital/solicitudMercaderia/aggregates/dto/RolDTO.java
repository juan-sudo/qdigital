package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class RolDTO {
    private Long idRol;
    private String nombreRol;
}
