package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProveedorRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProveedorService {
    ResponseBase findById(Long id);
    ResponseBase findAll();
    ResponseBase save(@Valid ProveedorRequest proveedorRequest); // Añadir @Valid aquí
    ResponseBase update(Long id, @Valid ProveedorRequest proveedorRequest);
    ResponseBase deleteById(Long id);
    Page<ProveedorDTO> findAll(Pageable pageable);
    ResponseBase updateCostos(Long id, ProveedorRequest proveedorRequest);
    ResponseBase updatedetalle(Long id, ProveedorRequest proveedorRequest);
    ResponseBase findAllLikeCodigo(String codigo);

    ResponseBase findAllLikeNombre(String nombre);
}
