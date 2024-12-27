package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.DetalleSolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SolicitudRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.entity.DetalleSolicitudMercaderiaEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import com.codigo.qdigital.solicitudMercaderia.mapper.GenericMapper;
import com.codigo.qdigital.solicitudMercaderia.repository.ProductoRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.ProveedoresRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.SolicitudMercaderiaRepository;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import com.codigo.qdigital.solicitudMercaderia.service.SolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class SolicitudServiceImpl implements SolicitudService {
    private final SolicitudMercaderiaRepository solicitudMercaderiaRepository;
    private final ProductoRepository productoRepository;
    private final GenericMapper genericMapper; // Inyectamos el GenericMapper

    @Transactional
    @Override
    public Page<SolicitudDTO> findAll(Pageable pageable) {
        // Validar que pageable no sea nulo
        if (pageable == null) {
            throw new IllegalArgumentException("El parámetro 'pageable' no puede ser nulo");
        }

        // Obtener los datos paginados desde el repositorio
        Page<SolicitudMercaderiaEntity> pageSolicitudes = solicitudMercaderiaRepository.findAll(pageable);

        // Validar si existen resultados
        if (pageSolicitudes.isEmpty()) {
            throw new NoSuchElementException("No se encontraron solicitudes de mercadería");
        }

        // Mapear las entidades a DTOs
        return pageSolicitudes.map(this::buildSolicitudDTO);
    }


    @Transactional
    @Override
    public ResponseBase saveSoicitud(SolicitudRequest solicitudRequest) {
        try {
            // Crear la entidad principal
            SolicitudMercaderiaEntity solicitudMercaderiaEntity = SolicitudMercaderiaEntity.builder()
                    .tSolicitud(solicitudRequest.gettSolicitud())
                    .tOperacion(solicitudRequest.gettOperacion())
                    .estado(solicitudRequest.getEstado())
                    .fecha(LocalDate.now())
                    .guia(solicitudRequest.getGuia())
                    .responsable(solicitudRequest.getResponsable())
                    .build();

            // Mapear los detalles
            Set<DetalleSolicitudMercaderiaEntity> detalles = solicitudRequest.getDetalles().stream()
                    .map(detalle -> {
                        ProductoEntity productoEntity = null;

                        // Si el ID no es nulo, buscar el producto
                        if (detalle.getIdproductoExistente() != null) {
                            productoEntity = productoRepository.findById(detalle.getIdproductoExistente())
                                    .orElseThrow(() -> new RuntimeException(
                                            "Producto no encontrado con ID: " + detalle.getIdproductoExistente()));
                        }

                        // Construir el detalle
                        DetalleSolicitudMercaderiaEntity detalleEntity = DetalleSolicitudMercaderiaEntity.builder()
                                .productoExistente(productoEntity) // Puede ser nulo
                                .cantidad(detalle.getCantidad())
                                .observ(detalle.getObserv())
                                .nombre(detalle.getNombre())
                                .producto(detalle.getProducto())
                                .proveedor(detalle.getProveedor())
                                .cliente(detalle.getCliente())
                                .build();

                        detalleEntity.setSolicitudMercaderia(solicitudMercaderiaEntity);
                        return detalleEntity;
                    })
                    .collect(Collectors.toSet());

            solicitudMercaderiaEntity.setDetalles(detalles);

            // Guardar todo en cascada
            solicitudMercaderiaRepository.save(solicitudMercaderiaEntity);

            return ResponseBase.builder()
                    .code(200)
                    .message("Solicitud guardada exitosamente.")
                    .data(solicitudMercaderiaEntity)
                    .build();

        } catch (IllegalArgumentException e) {
            return ResponseBase.builder()
                    .code(400)
                    .message("Error de validación: " + e.getMessage())
                    .data(null)
                    .build();
        } catch (Exception e) {
            return ResponseBase.builder()
                    .code(500)
                    .message("Error al guardar la solicitud: " + e.getMessage())
                    .data(null)
                    .build();
        }
    }


    @Transactional
    @Override
    public ResponseBase buscarSolicitudPorId(Long id) {
        Optional<SolicitudMercaderiaEntity> mercaderiaEntityOptional = solicitudMercaderiaRepository.findById(id);
        if (mercaderiaEntityOptional.isPresent()) {
            // Asegúrate de inicializar la colección
            SolicitudMercaderiaEntity solicitudEntity = mercaderiaEntityOptional.get();
            solicitudEntity.getDetalles().size();  // Esto inicializa la colección

            SolicitudDTO solicitudDTO = buildSolicitudDTO(solicitudEntity);
            return new ResponseBase(200, "Solicitud encontrada con éxito", solicitudDTO);
        }
        return new ResponseBase(404, "Solicitud no encontrada", null);
    }


    @Transactional
    @Override
    public ResponseBase findAll() {
        // Obtén todas las entidades del repositorio
        List<SolicitudMercaderiaEntity> listaSolicictudes = solicitudMercaderiaRepository.findAll();

        // Imprime las solicitudes para ver el contenido (útil para depuración)
       // System.out.println(listaSolicictudes);

        // Mapea las entidades a DTOs usando stream
        List<SolicitudDTO> listaDto = listaSolicictudes.stream()
                .map(this::buildSolicitudDTO)  // Utiliza el método buildSolicitudDTO para mapear la entidad a DTO
                .collect(Collectors.toList());  // Recoge el resultado en una lista

        // Retorna la respuesta con el código, mensaje y la lista de DTOs
        return new ResponseBase(200, "Solicitud exitosa", listaDto);
    }



    @Transactional
    @Override
    public ResponseBase delete(Long id) {
        // Buscar la entidad por la clave primaria (nSolicitud)
        Optional<SolicitudMercaderiaEntity> productoEntity = solicitudMercaderiaRepository.findByNSolicitud(id);

        if (productoEntity.isPresent()) {
            // Si la entidad existe, eliminarla
            solicitudMercaderiaRepository.delete(productoEntity.get());
            return new ResponseBase(200, "Solicitud eliminada con éxito", null);
        } else {
            // Si no se encuentra la entidad, retornar un error
            return new ResponseBase(404, "Solicitud no encontrada", null);
        }
    }


    private SolicitudDTO buildSolicitudDTO(SolicitudMercaderiaEntity solicitudEntity) {
        // Primero, mapear la entidad principal
        SolicitudDTO solicitudDTO = genericMapper.mapSolicitudEntityToSolicitudDTO(solicitudEntity);

        // Ahora, convertir el Set<DetalleSolicitudMercaderiaEntity> a Set<DetalleSolicitudDTO>
        Set<DetalleSolicitudDTO> detallesDTO = solicitudEntity.getDetalles().stream()
                .map(detalleEntity -> {
                    // Mapeamos cada DetalleSolicitudMercaderiaEntity a DetalleSolicitudDTO
                    DetalleSolicitudDTO detalleDTO = new DetalleSolicitudDTO();
                    detalleDTO.setId(detalleEntity.getId());
                    detalleDTO.setCantidad(detalleEntity.getCantidad());
                    detalleDTO.setNombre(detalleEntity.getNombre());
                    detalleDTO.setObserv(detalleEntity.getObserv());
                    detalleDTO.setProducto(detalleEntity.getProducto());
                    detalleDTO.setProveedor(detalleEntity.getProveedor());
                    detalleDTO.setCliente(detalleEntity.getCliente());

                    if (detalleEntity.getProductoExistente() != null) {
                        // Crear un ProductoDTO y mapear los atributos del producto
                        ProductoDTO productoDTO = new ProductoDTO();
                        productoDTO.setId(detalleEntity.getProductoExistente().getId());
                        productoDTO.setProducto(detalleEntity.getProductoExistente().getProducto());
                        productoDTO.setNombre(detalleEntity.getProductoExistente().getNombre());


                        if (detalleEntity.getProductoExistente().getProveedor() != null) {
                            ProveedorDTO proveedorDTO = new ProveedorDTO();
                            proveedorDTO.setNombre(detalleEntity.getProductoExistente().getProveedor().getNombre());
                            productoDTO.setProveedor(proveedorDTO);

                        }

                        // Asignar el productoDTO al DetalleSolicitudDTO
                        detalleDTO.setProductoExistente(productoDTO);
                    }
                    return detalleDTO;
                })
                .collect(Collectors.toSet());  // Convertir a Set

        // Convertir el Set a List
        solicitudDTO.setDetalles(new ArrayList<>(detallesDTO));  // Convertir Set a List

        return solicitudDTO;
    }


//    private SolicitudDTO buildSolicitudDTO(SolicitudMercaderiaEntity solicitudEntity) {
//        // Primero, mapear la entidad principal
//        SolicitudDTO solicitudDTO = genericMapper.mapSolicitudEntityToSolicitudDTO(solicitudEntity);
//
//        // Ahora, convertir el Set<DetalleSolicitudMercaderiaEntity> a List<DetalleSolicitudDTO>
//        List<DetalleSolicitudDTO> detallesDTO = solicitudEntity.getDetalles().stream()
//                .map(detalleEntity -> {
//                    // Mapeamos cada DetalleSolicitudMercaderiaEntity a DetalleSolicitudDTO
//                    DetalleSolicitudDTO detalleDTO = new DetalleSolicitudDTO();
//                    detalleDTO.setId(detalleEntity.getId());
//                    detalleDTO.setCantidad(detalleEntity.getCantidad());
//                    detalleDTO.setNombre(detalleEntity.getNombre());
//                    if (detalleEntity.getProductoExistente() != null) {
//                        // Crear un ProductoDTO y mapear los atributos del producto
//                        ProductoDTO productoDTO = new ProductoDTO();
//                        productoDTO.setId(detalleEntity.getProductoExistente().getId());
//                        productoDTO.setNombre(detalleEntity.getProductoExistente().getNombre());
//                       // productoDTO.setMarca(detalleEntity.getProductoExistente().getMarca());
//                        if(detalleEntity.getProductoExistente().getProveedor()!=null){
//                            ProveedorDTO proveedorDTO = new ProveedorDTO();
//                            proveedorDTO.setNombre(detalleEntity.getProductoExistente().getProveedor().getNombre());
//                            productoDTO.setProveedor(proveedorDTO);
//                        }
//
//
//
//                        // Asignar el productoDTO al DetalleSolicitudDTO
//                        detalleDTO.setProductoExistente(productoDTO);
//                    }
//                    return detalleDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Asignar la lista de detalles al DTO de solicitud
//        solicitudDTO.setDetalles(detallesDTO);
//
//        return solicitudDTO;
//    }





}
