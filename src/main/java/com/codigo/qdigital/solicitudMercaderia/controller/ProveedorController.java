package com.codigo.qdigital.solicitudMercaderia.controller;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProveedorRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.PagedResponse;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.ProveedorService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proveedores")
@AllArgsConstructor
public class ProveedorController {

    private final ProveedorService proveedorService;

    // Guardar un nuevo proveedor
    @PostMapping
    public ResponseEntity<ResponseBase> save(@RequestBody ProveedorRequest proveedorRequest) {
        ResponseBase response = proveedorService.save(proveedorRequest);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Actualizar un proveedor existente por su ID
    @PutMapping("/cliente/{id}")
    public ResponseEntity<ResponseBase> updateCliente(@PathVariable Long id, @RequestBody ProveedorRequest proveedorRequest) {
        ResponseBase response = proveedorService.update(id, proveedorRequest);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Actualizar un proveedor existente por su ID
    @PutMapping("/costo/{id}")
    public ResponseEntity<ResponseBase> updateCosto(@PathVariable Long id, @RequestBody ProveedorRequest proveedorRequest) {
        ResponseBase response = proveedorService.updateCostos(id, proveedorRequest);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Obtener un proveedor por su ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseBase> findById(@PathVariable Long id) {
        ResponseBase response = proveedorService.findById(id);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Obtener todos los proveedores
    @GetMapping
    public ResponseEntity<ResponseBase> findAll() {
        ResponseBase response = proveedorService.findAll();
        return ResponseEntity.status(response.getCode()).body(response);
    }



    // Eliminar un proveedor por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseBase> deleteById(@PathVariable Long id) {
        ResponseBase response = proveedorService.deleteById(id);
        return ResponseEntity.status(response.getCode()).body(response);
    }
    @GetMapping("/proveedores")
    public ResponseEntity<ResponseBase> getAllSolicitudes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        // Validar que los parámetros de página y tamaño sean positivos
        if (page < 0 || size <= 0) {
            return ResponseEntity.badRequest()
                    .body(ResponseBase.builder()
                            .code(400)
                            .message("Los parámetros 'page' y 'size' deben ser mayores o iguales a 0")
                            .build());
        }

        // Crear paginación con orden descendente
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "idProveedores"));

        Page<ProveedorDTO> solicitudes = proveedorService.findAll(pageable);

        // Construir la respuesta
        return ResponseEntity.ok(ResponseBase.builder()
                .code(200)
                .message("Solicitud exitosa")
                .data(PagedResponse.<ProveedorDTO>builder()
                        .content(solicitudes.getContent())            // Lista de elementos
                        .totalElements(solicitudes.getTotalElements()) // Total de elementos
                        .totalPages(solicitudes.getTotalPages())       // Total de páginas
                        .currentPage(solicitudes.getNumber())          // Página actual
                        .build())
                .build());
    }

}
