package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProveedorRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.UsuarioEntity;
import com.codigo.qdigital.solicitudMercaderia.mapper.GenericMapper;
import com.codigo.qdigital.solicitudMercaderia.repository.ProductoRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.ProveedoresRepository;
import com.codigo.qdigital.solicitudMercaderia.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedoresRepository proveedorRepository;
    private final GenericMapper genericMapper;
    private final ProductoRepository productoRepository;


    @Override
    public ResponseBase updateCostos(Long id, ProveedorRequest proveedorRequest) {
        Optional<ProveedorEntity> proveedorEntity =  proveedorRepository.findByIdWithoutProducto(id);

        if (proveedorEntity.isPresent()) {
            ProveedorEntity updatedEntity = proveedorEntity.get();
            updatedEntity.setCodigoProveedor(proveedorRequest.getCodigoProveedor());
            updatedEntity.setNombre(proveedorRequest.getNombre());
            updatedEntity.setAdminProveedor(proveedorRequest.getAdminProveedor());
            updatedEntity.setPerdida(proveedorRequest.getPerdida());
            updatedEntity.setFlete(proveedorRequest.getFlete());
            updatedEntity.setCondPago(proveedorRequest.getCondPago());
            updatedEntity.setnDias(proveedorRequest.getNDias());
            updatedEntity.setDocto(proveedorRequest.getDocto());
            updatedEntity.setChAdj(proveedorRequest.getChAdj());


            proveedorRepository.save(updatedEntity);
            // Convertimos la entidad a DTO
            ProveedorDTO proveedorDTO = genericMapper.mapProveedorEntityToProveedorDTO(updatedEntity);

            return ResponseBase.builder()
                    .code(200)
                    .message("Proveedor actualizado exitosamente.")
                    .data(proveedorDTO)
                    .build();
        }

        return ResponseBase.builder()
                .code(404)
                .message("Proveedor no encontrado.")
                .data(null)
                .build();
    }


    @Override
    public ResponseBase update(Long id, ProveedorRequest proveedorRequest) {
        Optional<ProveedorEntity> proveedorEntity =  proveedorRepository.findByIdWithoutProducto(id);

        if (proveedorEntity.isPresent()) {
            ProveedorEntity updatedEntity = proveedorEntity.get();
            updatedEntity.setCodigoProveedor(proveedorRequest.getCodigoProveedor());
            updatedEntity.setNombre(proveedorRequest.getNombre());
            updatedEntity.setDireccion(proveedorRequest.getDireccion());
            updatedEntity.setFono1(proveedorRequest.getFono1());
            updatedEntity.setCiudad(proveedorRequest.getCiudad());
            updatedEntity.setAtencion(proveedorRequest.getAtencion());
            updatedEntity.setCeluVenta(proveedorRequest.getCeluVenta());
            updatedEntity.setCiudadVen(proveedorRequest.getCiudadVen());
            updatedEntity.setCorreo(proveedorRequest.getCorreo());

            updatedEntity.setCondPago(proveedorRequest.getCondPago());
            updatedEntity.setDocto(proveedorRequest.getDocto());
            updatedEntity.setChAdj(proveedorRequest.getChAdj());

            proveedorRepository.save(updatedEntity);
            // Convertimos la entidad a DTO
            ProveedorDTO proveedorDTO = genericMapper.mapProveedorEntityToProveedorDTO(updatedEntity);

            return ResponseBase.builder()
                    .code(200)
                    .message("Proveedor actualizado exitosamente.")
                    .data(proveedorDTO)
                    .build();
        }

        return ResponseBase.builder()
                .code(404)
                .message("Proveedor no encontrado.")
                .data(null)
                .build();
    }


    @Override
    public ResponseBase save(ProveedorRequest proveedorRequest) {
        try {
            ProveedorEntity proveedorEntity = ProveedorEntity.builder()
                    .codigoProveedor(proveedorRequest.getCodigoProveedor())
                    .nombre(proveedorRequest.getNombre())


                    .build();

            proveedorRepository.save(proveedorEntity);

            // Convertimos la entidad a DTO
            ProveedorDTO proveedorDTO = genericMapper.mapProveedorEntityToProveedorDTO(proveedorEntity);


            return ResponseBase.builder()
                    .code(200)
                    .message("Proveedor guardado exitosamente.")
                    .data(proveedorDTO)
                    .build();

        } catch (Exception e) {
            return ResponseBase.builder()
                    .code(500)
                    .message("Error al guardar el proveedor: " + e.getMessage())
                    .data(null)
                    .build();
        }
    }


    @Transactional
    @Override
    public Page<ProveedorDTO> findAll(Pageable pageable) {
        // Validar que pageable no sea nulo
        if (pageable == null) {
            throw new IllegalArgumentException("El parámetro 'pageable' no puede ser nulo");
        }

        // Obtener los datos paginados desde el repositorio
        Page<ProveedorEntity> pageSolicitudes = proveedorRepository.findAll(pageable);

        // Validar si existen resultados
        if (pageSolicitudes.isEmpty()) {
            throw new NoSuchElementException("No se encontraron proveedores");
        }

        // Mapear las entidades a DTOs
        return pageSolicitudes.map(this::mapToDTO);
    }


    @Override
    public ResponseBase findById(Long id) {
        Optional<ProveedorEntity> proveedorEntity = proveedorRepository.findById(id);

        if (proveedorEntity.isPresent()) {
            ProveedorDTO proveedorDTO = mapToDTO(proveedorEntity.get());
            return ResponseBase.builder()
                    .code(200)
                    .message("Proveedor encontrado.")
                    .data(proveedorDTO)
                    .build();
        }

        return ResponseBase.builder()
                .code(404)
                .message("Proveedor no encontrado.")
                .data(null)
                .build();
    }



    @Override
    public ResponseBase findAll() {
        try {
            List<ProveedorEntity> proveedores = proveedorRepository.findAll();

            if (proveedores.isEmpty()) {
                return ResponseBase.builder()
                        .code(204) // Código HTTP No Content
                        .message("No hay proveedores registrados")
                        .data(null) // No hay datos que retornar
                        .build();
            }

            List<ProveedorDTO> proveedorDTOs = proveedores.stream()
                    .map(this::mapToDTO) // Convierte cada entidad en DTO
                    .collect(Collectors.toList());

            return ResponseBase.builder()
                    .code(200) // Código HTTP OK
                    .message("Lista de proveedores")
                    .data(proveedorDTOs) // Lista de DTOs
                    .build();
        } catch (Exception e) {
            return ResponseBase.builder()
                    .code(500) // Código HTTP Internal Server Error
                    .message("Error al obtener los proveedores")
                    .data(e.getMessage()) // Mensaje de error como datos
                    .build();
        }
    }
    @Override
    public ResponseBase deleteById(Long id) {
        try {
            Optional<ProveedorEntity> proveedorEntity = proveedorRepository.findById(id);

            if (proveedorEntity.isPresent()) {
                // Eliminar los productos relacionados
                productoRepository.deleteByProveedorId(id);

                // Ahora eliminar el proveedor
                proveedorRepository.deleteById(id);

                return ResponseBase.builder()
                        .code(200)
                        .message("Proveedor eliminado exitosamente.")
                        .data(null)
                        .build();
            }

            return ResponseBase.builder()
                    .code(404)
                    .message("Proveedor no encontrado.")
                    .data(null)
                    .build();
        } catch (Exception e) {
            return ResponseBase.builder()
                    .code(500)
                    .message("Error al eliminar el proveedor: " + e.getMessage())
                    .data(null)
                    .build();
        }
    }


    private ProveedorDTO mapToDTO(ProveedorEntity proveedorEntity) {
        return ProveedorDTO.builder()
                .idProveedores(proveedorEntity.getIdProveedores())
                .codigoProveedor(proveedorEntity.getCodigoProveedor())
                .nombre(proveedorEntity.getNombre())
                .direccion(proveedorEntity.getDireccion())
                .fono1(proveedorEntity.getFono1())
                .ciudad(proveedorEntity.getCiudad())
                .atencion(proveedorEntity.getAtencion())
                .celuVenta(proveedorEntity.getCeluVenta())
                .ciudadVen(proveedorEntity.getCiudadVen())
                .adminProveedor(proveedorEntity.getAdminProveedor())
                .perdida(proveedorEntity.getPerdida())
                .flete(proveedorEntity.getFlete())
                .condPago(proveedorEntity.getCondPago())
                .nDias(proveedorEntity.getnDias())
                .docto(proveedorEntity.getDocto())
                .chAdj(proveedorEntity.getChAdj())
                .correo(proveedorEntity.getCorreo())
                .fechaRegistro(proveedorEntity.getFechaRegistro())


                .build();
    }
}
