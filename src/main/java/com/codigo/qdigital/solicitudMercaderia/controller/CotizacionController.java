package com.codigo.qdigital.solicitudMercaderia.controller;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.CotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.CotizacionService;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



}
