package com.codigo.qdigital.solicitudMercaderia.controller;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.*;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.CotizacionService;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cotizacion")
@RequiredArgsConstructor  // Utiliza solo esta anotación
public class CotizacionController {

    private final CotizacionService cotizacionService;

    // Endpoint para crear un producto
    @PostMapping
    public ResponseBase createProducto(@RequestBody CotizacionRequest cotizacionRequest) {

        // Retornamos la respuesta con el código de estado adecuado
        return cotizacionService.saveCotizacion(cotizacionRequest);
    }
    @GetMapping
    public ResponseBase getAllCotizacion() {

        // Retornamos la respuesta con el código de estado adecuado
        return cotizacionService.findAllCotizacion();
    }

    // Endpoint para obtener un producto por su ID
    @GetMapping("/{id}")
    public ResponseBase getCotizacionById(@PathVariable Long id) {

        // Retornamos la respuesta con el código de estado adecuado
        return cotizacionService.buscarCotizacionPorId(id);
    }

    // Actualizar un proveedor existente por su ID
    @PutMapping("/productonuevo/{id}")
    public ResponseEntity<ResponseBase> agregarProductoNuevo(@PathVariable Long id, @RequestBody List<DetalleCotizacionProductoRequest> nuevosDetalles) {
        // Usamos 'id' del PathVariable como cotizacionId

        // Llamamos al servicio para actualizar la cotización
        ResponseBase response = cotizacionService.updateCotizacion(id, nuevosDetalles);

        // Retornamos la respuesta con el código de estado
        return ResponseEntity.status(response.getCode()).body(response);
    }




}
