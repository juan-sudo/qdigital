package com.codigo.qdigital.solicitudMercaderia.service.impl;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.response.ResponseBase;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.codigo.qdigital.solicitudMercaderia.mapper.GenericMapper;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.aggregates.request.ProductoRequest;
import com.codigo.qdigital.solicitudMercaderia.repository.ProductoRepository;
import com.codigo.qdigital.solicitudMercaderia.repository.ProveedoresRepository;
import com.codigo.qdigital.solicitudMercaderia.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedoresRepository proveedoresRepository;
    private final GenericMapper genericMapper;


    @Transactional
    @Override
    public ResponseBase findProductoByIdProveedor(Long  idProvedor) {
        // Obtener los datos desde el repositorio
        List<ProductoEntity> proveedores = productoRepository.findProductosByProveedorId(idProvedor);

        // Validar si existen resultados
        if (proveedores.isEmpty()) {
            // Si no se encuentran proveedores, retornamos un error en la respuesta
            return ResponseBase.builder()
                    .code(404) // Código de error 404 (No encontrado)
                    .message("No se encontraron productos con el código proporcionado")
                    .data(null) // No hay datos si no se encuentran proveedores
                    .build();
        }

        // Mapear las entidades a DTOs
        List<ProductoDTO> productosDTO = proveedores.stream()
                .map(this::buildProductoDTO) // Convertir cada entidad en un DTO
                .collect(Collectors.toList());

        // Retornar una respuesta exitosa con los datos de los proveedores
        return ResponseBase.builder()
                .code(200) // Código de éxito 200
                .message("productos encontrados con éxito")
                .data(productosDTO) // Los datos serán los DTOs de proveedores
                .build();
    }



    // Método para guardar un producto
    @Transactional
    @Override
    public ResponseBase saveProducto(ProductoRequest productoRequest) {
        // Validar si el proveedor existe
        Optional<ProveedorEntity> proveedorOpt = proveedoresRepository.findByIdProveedores(productoRequest.getProveedorId());
        if (proveedorOpt.isEmpty()) {
            // Si el proveedor no existe, se retorna un error
            return new ResponseBase(404, "Proveedor no encontrado con el código: " + productoRequest.getCodProv(), null);
        }

        // Crear la entidad ProductoEntity a partir del request
        ProductoEntity productoEntity = ProductoEntity.builder()

                .producto(productoRequest.getProducto())
                .nombre(productoRequest.getNombre())
                .cNeto(productoRequest.getCNeto())
                .codProv(productoRequest.getCodProv())
                .stockLib(productoRequest.getStockLib())
                .fCompra(productoRequest.getFCompra())
                .cantidad(productoRequest.getCantidad())
                .stDic2023(productoRequest.getStDic2023())
                .compras(productoRequest.getCompras())
                .ventas(productoRequest.getVentas())
                .stAbr2024(productoRequest.getStAbr2024())
                .proveedor(proveedorOpt.get())
                .build();

        // Guardar el producto en la base de datos
        ProductoEntity savedProduct = productoRepository.save(productoEntity);

        // Retornar respuesta con el producto creado
        return new ResponseBase(201, "Producto registrado con éxito.", savedProduct);
    }

    // Método para obtener un producto por su ID
    @Transactional(readOnly = true)
    @Override
    public ResponseBase buscarProductoPorId(Long id) {
        Optional<ProductoEntity> productoEntity = productoRepository.findById(id);
        if (productoEntity.isPresent()) {
            ProductoDTO productoDTO = buildProductoDTO(productoEntity.get());
            return new ResponseBase(200, "Producto encontrado con éxito", productoDTO);
        }
        // Si el producto no existe, se retorna un error
        return new ResponseBase(404, "Producto no encontrado", null);
    }

    // Método para obtener todos los productos
    @Override
    public ResponseBase findAll() {
        // Obtén todas las entidades del repositorio
       List<ProductoEntity> listaEntidades = productoRepository.findAll();

        // Crea una lista para almacenar los DTOs mapeados
        Set<ProductoDTO> listaDto = new HashSet<>();

        // Itera sobre las entidades y mapea a DTOs
        for (ProductoEntity productoEntity : listaEntidades) {
            ProductoDTO productoDto = buildProductoDTO(productoEntity);
            listaDto.add(productoDto);
        }

        // Retorna la respuesta con el código, mensaje y la lista de DTOs
        return new ResponseBase(200, "Solicitud exitosa", listaDto);
    }

    // Método para eliminar un producto
    @Override
    public ResponseBase delete(Long id) {
        // Verifica si el producto existe en la base de datos
        Optional<ProductoEntity> productoEntity = productoRepository.findById(id);

        // Si no existe, lanza una excepción de recurso no encontrado
        if (productoEntity.isEmpty()) {
            return new ResponseBase(404, "Producto no encontrado con ID: " + id, null);
        }

        // Elimina el producto de la base de datos
        productoRepository.deleteById(id);

        // Retorna una respuesta indicando que el producto fue eliminado exitosamente
        return new ResponseBase(200, "Producto eliminado con éxito", null);
    }

    // Método privado para convertir una entidad ProductoEntity en un DTO ProductoDTO
    private ProductoDTO buildProductoDTO(ProductoEntity productoEntity) {

        return ProductoDTO.builder()
                .id(productoEntity.getId())
                .producto(productoEntity.getProducto())
                .nombre(productoEntity.getNombre())
                .codProv(productoEntity.getCodProv())
                .stockLib(productoEntity.getStockLib())
                .fCompra(productoEntity.getfCompra())
                .cantidad(productoEntity.getCantidad())
                .stDic2023(productoEntity.getStDic2023())
                .stAbr2024(productoEntity.getStAbr2024())
                .compras(productoEntity.getCompras())
                .ventas(productoEntity.getVentas())

                .build();


    }

}
