package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleSolicitudRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.DetalleSolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DetalleSolicitudServiceImpl implements DetalleSolicitudService {

    @Override
    public ResponseBase findAll() {
        return null;
    }

    @Override
    public ResponseBase saveDetalleSolictud(DetalleSolicitudRequest detalleSolicitudRequest) {
        return null;
    }

    @Override
    public ResponseBase delete(Long id) {
        return null;
    }

    @Override
    public ResponseBase buscarDetalleSolicitudPorId(Long id) {
        return null;
    }
}
