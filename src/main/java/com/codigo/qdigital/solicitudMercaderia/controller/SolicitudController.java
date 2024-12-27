package com.codigo.qdigital.solicitudMercaderia.controller;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.SolicitudRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.PagedResponse;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.SolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;


@RestController
@RequestMapping("/api/solicitud")
@RequiredArgsConstructor  // Utiliza solo esta anotación
public class SolicitudController {
    private final SolicitudService solicitudService;

    @PostMapping()
    public ResponseBase saveSolicitud(@RequestBody  SolicitudRequest solicitudRequest) {

        return solicitudService.saveSoicitud(solicitudRequest);
    }

    // Endpoint para obtener un producto por su ID
    @GetMapping("/{id}")
    public ResponseBase getProductoById(@PathVariable Long id) {

        return solicitudService.buscarSolicitudPorId(id);
    }

    @GetMapping
    public ResponseBase getAllProductos() {

        return solicitudService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseBase delete(@PathVariable Long id) {
        return solicitudService.delete(id);
    }

    @GetMapping("/solicitudes")
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
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "nSolicitud"));

        Page<SolicitudDTO> solicitudes = solicitudService.findAll(pageable);

        // Construir la respuesta
        return ResponseEntity.ok(ResponseBase.builder()
                .code(200)
                .message("Solicitud exitosa")
                .data(PagedResponse.<SolicitudDTO>builder()
                        .content(solicitudes.getContent())            // Lista de elementos
                        .totalElements(solicitudes.getTotalElements()) // Total de elementos
                        .totalPages(solicitudes.getTotalPages())       // Total de páginas
                        .currentPage(solicitudes.getNumber())          // Página actual
                        .build())
                .build());
    }


}
