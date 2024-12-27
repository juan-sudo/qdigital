package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SolicitudRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SolicitudService {

    ResponseBase findAll();
    ResponseBase saveSoicitud(SolicitudRequest solicitudRequest); // Añadir @Valid aquí
    ResponseBase delete(Long id);
    ResponseBase buscarSolicitudPorId(Long id);
    Page<SolicitudDTO> findAll(Pageable pageable);
}
