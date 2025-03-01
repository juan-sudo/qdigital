package com.codigo.qdigital.solicitudMercaderia.controller;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor  // Utiliza solo esta anotación
public class ProductoController {

    private final ProductoService  productoService;

    // Endpoint para crear un producto
    @PostMapping
    public ResponseEntity<ResponseBase> createProducto(@RequestBody ProductoRequest productoRequest) {
        ResponseBase response = productoService.saveProducto(productoRequest);

        // Retornar la respuesta con el código HTTP correspondiente
        return ResponseEntity.status(response.getCode()).body(response);
    }

    // Endpoint para obtener todos los productos
    @GetMapping
    public ResponseBase getAllProductos() {

        // Retornamos la respuesta con el código de estado adecuado
        return productoService.findAll();
    }

    // Endpoint para obtener un producto por su ID
    @GetMapping("/{id}")
    public ResponseBase getProductoById(@PathVariable Long id) {

        // Retornamos la respuesta con el código de estado adecuado
        return productoService.buscarProductoPorId(id);
    }
    // Endpoint para eliminar un producto por su ID
    @DeleteMapping("/{id}")
    public ResponseBase deleteProducto(@PathVariable Long id) {
        // Llamada al servicio para eliminar el producto
        return productoService.delete(id);
    }


    @GetMapping("/buscaridproveedor/{idProveedor}")
    public ResponseEntity<ResponseBase> buscarPorProveedores(@PathVariable Long idProveedor) {
        ResponseBase response = productoService.findProductoByIdProveedor(idProveedor);
        return ResponseEntity.status(response.getCode()).body(response);
    }


}
