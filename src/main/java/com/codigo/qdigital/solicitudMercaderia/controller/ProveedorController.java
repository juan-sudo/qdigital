package com.codigo.qdigital.solicitudMercaderia.controller;

import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProveedorRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.ProveedorService;
import lombok.AllArgsConstructor;
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

    // Actualizar un proveedor existente por su ID
    @PutMapping("/{id}")
    public ResponseEntity<ResponseBase> update(@PathVariable Long id, @RequestBody ProveedorRequest proveedorRequest) {
        ResponseBase response = proveedorService.update(id, proveedorRequest);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Eliminar un proveedor por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseBase> deleteById(@PathVariable Long id) {
        ResponseBase response = proveedorService.deleteById(id);
        return ResponseEntity.status(response.getCode()).body(response);
    }
}
