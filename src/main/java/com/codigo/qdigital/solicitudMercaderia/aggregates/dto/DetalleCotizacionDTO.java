package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.codigo.qdigital.solicitudMercaderia.entity.CotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DetalleCotizacionDTO {
    private Long id;
    private Long cantidad;
    private ProductoDTO producto;
    private CotizacionDTO cotizacion;






}
