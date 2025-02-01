package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.CotizacionDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.DetalleCotizacionDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.CotizacionRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleCotizacionProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.DetalleCotizacionRequest;
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

import java.util.*;
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
    public ResponseBase updateCotizacion(Long cotizacionId, List<DetalleCotizacionProductoRequest> nuevosDetalles) {
        // Buscar la cotización existente
        CotizacionEntity cotizacion = cotizacionRepository.findById(cotizacionId)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        Set<Long> productosExistentes = cotizacion.getDetalleCotizacion()
                .stream()
                .map(detalle -> detalle.getProducto().getId())
                .collect(Collectors.toSet());

        List<DetalleCotizacionEntity> nuevosDetallesEntities = new ArrayList<>();

        for (DetalleCotizacionProductoRequest detalleRequest : nuevosDetalles) {
            // Buscar el producto usando el ID o crearlo si no existe
            ProductoEntity producto = productoRepository.findByProducto(detalleRequest.getProducto())
                    .orElseGet(() -> {
                        // Crear un nuevo producto
                        ProductoEntity nuevoProducto = ProductoEntity.builder()
                                .producto(detalleRequest.getProducto())
                                .nombre(detalleRequest.getNombre())
                                .proveedor(cotizacion.getProveedor())
                                .build();

                        ProductoEntity savedProducto = productoRepository.save(nuevoProducto);

                        // 🚨 Verificar si realmente se guardó
                        if (savedProducto.getId() == null) {
                            throw new RuntimeException("Error al crear el producto: " + detalleRequest.getProducto());
                        }

                        return savedProducto;
                    });

            // Si el producto no está en la cotización, agregarlo
            if (!productosExistentes.contains(producto.getId())) {
                DetalleCotizacionEntity nuevoDetalle = DetalleCotizacionEntity.builder()
                        .cantidad(detalleRequest.getCantidad())
                        .producto(producto)
                        .cotizacion(cotizacion)
                        .build();
                nuevosDetallesEntities.add(nuevoDetalle);
            }
        }

        // Guardar los nuevos detalles en la base de datos si hay nuevos productos
        if (!nuevosDetallesEntities.isEmpty()) {
            detalleCotizacionRepository.saveAll(nuevosDetallesEntities);
            cotizacion.getDetalleCotizacion().addAll(nuevosDetallesEntities);
        }

        return new ResponseBase(200, "Cotización actualizada con éxito. Se agregaron nuevos productos.", cotizacion);
    }



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


    @Transactional(readOnly = true)
    @Override
    public ResponseBase buscarCotizacionPorId(Long id) {
        Optional<CotizacionEntity> cotizacionEntity = cotizacionRepository.findById(id);
        if (cotizacionEntity.isPresent()) {
            CotizacionDTO cotizacionDTO = buildCotizacionDTO(cotizacionEntity.get());
            return new ResponseBase(200, "Producto encontrado con éxito", cotizacionDTO);
        }
        // Si el producto no existe, se retorna un error
        return new ResponseBase(404, "Producto no encontrado", null);
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
                                .sorted(Comparator.comparing(detalle -> detalle.getProducto().getId(), Comparator.reverseOrder())) // Orden DESC por id producto
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
