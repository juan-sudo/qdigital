package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductoDTO {
    private Long id;
    private String producto;  // Identificador del producto
    private String nombre;  // Nombre del producto
    private BigDecimal cNeto;  // Costo neto del producto
    private String codProv;  // Código del proveedor
    private BigDecimal stockLib;  // Stock disponible
    private LocalDate fCompra;  // Fecha de compra
    private BigDecimal cantidad;  // Cantidad del producto
    private BigDecimal stDic2023;  // Stock a diciembre 2023
    private BigDecimal compras;  // Compras realizadas
    private BigDecimal ventas;  // Ventas realizadas
    private BigDecimal stAbr2024;  // Stock a abril 2024
    private ProveedorDTO proveedor;  // ID del proveedor
}
