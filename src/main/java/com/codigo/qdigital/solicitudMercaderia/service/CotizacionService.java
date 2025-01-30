package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.CotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;

public interface CotizacionService {

    ResponseBase findAllCotizacion();
    ResponseBase saveCotizacion(CotizacionRequest cotizacionRequest); // Añadir @Valid aquí
    ResponseBase deleteCotizacion(Long id);

}
