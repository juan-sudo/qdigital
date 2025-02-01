package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.CotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleCotizacionProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleCotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;

import java.util.List;

public interface CotizacionService {

    ResponseBase findAllCotizacion();
    ResponseBase saveCotizacion(CotizacionRequest cotizacionRequest); // Añadir @Valid aquí
    ResponseBase deleteCotizacion(Long id);
    ResponseBase updateCotizacion(Long cotizacionId,  List<DetalleCotizacionProductoRequest> nuevosDetalles);
    ResponseBase buscarCotizacionPorId(Long id);
}
