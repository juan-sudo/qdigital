package com.codigo.qdigital.solicitudMercaderia.service;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;

public interface ProductoService {

    ResponseBase findAll();
    ResponseBase saveProducto(ProductoRequest proveedorRequest); // Añadir @Valid aquí
    ResponseBase delete(Long id);
    ResponseBase buscarProductoPorId(Long id);
    ResponseBase findProductoByIdProveedor(Long  idProvedor);
}
