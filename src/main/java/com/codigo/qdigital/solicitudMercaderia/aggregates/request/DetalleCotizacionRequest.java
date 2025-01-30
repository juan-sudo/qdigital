package com.codigo.qdigital.solicitudMercaderia.aggregates.request;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DetalleCotizacionRequest {

    private Long cantidad;

    // ID del proveedor (referencia en lugar del objeto completo)
    @NotNull(message = "El ID del proveedor no puede ser nulo.")
    private Long productoId;  // ID del proveedor


    // ID del proveedor (referencia en lugar del objeto completo)
    @NotNull(message = "El ID del cotizacion no puede ser nulo.")
    private Long cotizacionId;  // ID del proveedor







}
