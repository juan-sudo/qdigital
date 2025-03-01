package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProveedorDTO {
    private Long idProveedores;  // ID del proveedor
    private String codigoProveedor; // Código del proveedor
    private String correo;
    private String correoContacto;
    private String nombre;          // Nombre del proveedor
    private String direccion;       // Dirección
    private String fono1;           // Teléfono (ajustado a String)
    private String region;
    private String comuna;
    private String atencion;        // Atención
    private String celuVenta;       // Número de celular
    private String ciudadVen;       // Ciudad de venta
    private BigDecimal adminProveedor;  // Administrador proveedor
    private BigDecimal perdida;         // Pérdida
    private BigDecimal flete;           // Flete
    private BigDecimal condPago;        // Condición de pago
    private Integer nDias;              // Número de días
    private BigDecimal docto;           // Documento
    private String chAdj;               // Archivo adjunto
    private List<ProductoDTO> productos; // Lista de productos relacionados
    private UsuarioDTO usuario;
    private LocalDateTime fechaRegistro;  // Fecha de publicación del producto

}
