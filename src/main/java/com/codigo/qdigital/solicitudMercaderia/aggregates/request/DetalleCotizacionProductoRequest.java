package com.codigo.qdigital.solicitudMercaderia.aggregates.request;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DetalleCotizacionProductoRequest {

    @NotNull(message = "El producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String producto;  // Identificador del producto

    @NotNull(message = "El nombre del producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String nombre;  // Nombre del producto

    private Long cantidad;

    private Long proveedorId;  // ID del proveedor





}
