package com.codigo.qdigital.solicitudMercaderia.aggregates.request;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CotizacionRequest {

    @NotNull(message = "El numero no puede ser nulo.")
    @Size(min = 3, max = 300, message = "El numero debe tener entre 3 y 300 caracteres.")
    private String numero;

    @NotNull(message = "La fecha de cotizaion no puede ser nula.")
    private LocalDate fechaCotizacion;

    private String responsable;

    // ID del proveedor (referencia en lugar del objeto completo)
    @NotNull(message = "El ID del proveedor no puede ser nulo.")
    private Long proveedorId;  // ID del proveedor

    private List<DetalleCotizacionRequest> detalleCotizacionRequests; // Lista de productos relacionados





}
