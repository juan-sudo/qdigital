package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.codigo.qdigital.solicitudMercaderia.entity.DetalleCotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CotizacionDTO {
    private Long id;
    private String numero;
    private LocalDate fechaCotizacion;
    private String responsable;
    private ProveedorDTO proveedor;
    private List<DetalleCotizacionDTO> detalleCotizacionDTO;  // Relación con la entidad Productos




}
