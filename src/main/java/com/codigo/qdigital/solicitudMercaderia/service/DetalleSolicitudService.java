package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleSolicitudRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;

public interface DetalleSolicitudService {

    ResponseBase findAll();
    ResponseBase saveDetalleSolictud(DetalleSolicitudRequest detalleSolicitudRequest); // Añadir @Valid aquí
    ResponseBase delete(Long id);
    ResponseBase buscarDetalleSolicitudPorId(Long id);
}
