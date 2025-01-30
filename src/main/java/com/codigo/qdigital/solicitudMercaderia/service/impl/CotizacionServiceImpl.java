package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.CotizacionDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.DetalleCotizacionDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.CotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.entity.CotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.DetalleCotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.codigo.qdigital.solicitudMercaderia.mapper.GenericMapper;
import com.codigo.qdigital.solicitudMercaderia.repository.CotizacionRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.DetalleCotizacionRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.ProductoRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.ProveedoresRepository;
import com.codigo.qdigital.solicitudMercaderia.service.CotizacionService;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CotizacionServiceImpl implements CotizacionService {
    private final CotizacionRepository cotizacionRepository;
    private final ProductoRepository productoRepository;
    private final ProveedoresRepository proveedoresRepository;
    private final DetalleCotizacionRepository detalleCotizacionRepository;
    private final GenericMapper genericMapper;




    @Transactional
    @Override
    public ResponseBase saveCotizacion(CotizacionRequest cotizacionRequest) {
        // Obtener el último número de cotización y generar el siguiente
        List<String> lastCotizacionNumeroList = cotizacionRepository.getLastCotizacionNumero();
        String nextNumero;

        if (lastCotizacionNumeroList.isEmpty()) {
            nextNumero = "COT0001";  // Si no hay cotizaciones, el primer número es COT0001
        } else {
            String lastCotizacionNumero = lastCotizacionNumeroList.get(0);  // Obtener el primer resultado (último registrado)
            nextNumero = generateNextCotizacionNumero(lastCotizacionNumero);
        }
        CotizacionEntity cotizacionEntity = CotizacionEntity.builder()
                .numero(nextNumero)
                .responsable("eduardo")
                .proveedor(proveedoresRepository.findById(cotizacionRequest.getProveedorId()).orElseThrow(() -> new RuntimeException("Proveedor no encontrado")))
                .build();

        // Guardar la cotización en la base de datos
        CotizacionEntity savedCotizacion = cotizacionRepository.save(cotizacionEntity);

        // Guardar los detalles de la cotización
        Set<DetalleCotizacionEntity> detalleCotizacionEntities = cotizacionRequest.getDetalleCotizacionRequests().stream()
                .map(detalleRequest -> {
                    ProductoEntity producto = productoRepository.findById(detalleRequest.getProductoId()).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
                    return DetalleCotizacionEntity.builder()
                            .cantidad(detalleRequest.getCantidad())
                            .producto(producto)
                            .cotizacion(savedCotizacion)
                            .build();
                })
                .collect(Collectors.toSet());

        // Guardar los detalles de la cotización
        detalleCotizacionRepository.saveAll(detalleCotizacionEntities);

        // Retornar la respuesta con la cotización creada y sus detalles
        return new ResponseBase(201, "Cotización registrada con éxito.", savedCotizacion);
    }

    @Override
    public ResponseBase deleteCotizacion(Long id) {
        return null;
    }


    @Transactional  // Se usa para evitar LazyInitializationException
    @Override
    public ResponseBase findAllCotizacion() {
        List<CotizacionDTO> listaDTOs = cotizacionRepository.findAllCotizacionesDesc().stream()
                .map(this::buildCotizacionDTO)
                .collect(Collectors.toList());

        return new ResponseBase(200, "Solicitud exitosa", listaDTOs);
    }


    private CotizacionDTO buildCotizacionDTO(CotizacionEntity cotizacionEntity) {
        return CotizacionDTO.builder()
                .id(cotizacionEntity.getId())
                .numero(cotizacionEntity.getNumero())
                .responsable(cotizacionEntity.getResponsable())
                .fechaCotizacion(cotizacionEntity.getFechaCotizacion())
                .proveedor(ProveedorDTO.builder()
                        .idProveedores(cotizacionEntity.getProveedor().getIdProveedores())
                        .nombre(cotizacionEntity.getProveedor().getNombre())
                        .build())
                .detalleCotizacionDTO(
                        cotizacionEntity.getDetalleCotizacion().stream()
                                .map(detalle -> DetalleCotizacionDTO.builder()
                                        .id(detalle.getId())
                                        .cantidad(detalle.getCantidad())
                                        .producto(ProductoDTO.builder()
                                                .id(detalle.getProducto().getId())
                                                .nombre(detalle.getProducto().getNombre())
                                                .producto(detalle.getProducto().getProducto())
                                                .build())
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }
    private String generateNextCotizacionNumero(String lastNumero) {
        if (lastNumero == null || lastNumero.isEmpty()) {
            return "COT0001";  // Primer número
        }

        String prefix = "COT";
        int numberPart = Integer.parseInt(lastNumero.substring(prefix.length()));
        return prefix + String.format("%04d", numberPart + 1);  // Genera el siguiente número con formato
    }

}
