package com.codigo.qdigital.solicitudMercaderia.aggregates.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProductoRequest {

    @NotNull(message = "El producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String producto;  // Identificador del producto

    @NotNull(message = "El nombre del producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String nombre;  // Nombre del producto

   // @NotNull(message = "El costo neto del producto no puede ser nulo.")
    @DecimalMin(value = "0.0", inclusive = false, message = "El costo neto del producto debe ser mayor que 0.")
    private BigDecimal cNeto;  // Costo neto del producto

   // @NotNull(message = "El código del proveedor no puede ser nulo.")
    @Size(min = 5, max = 20, message = "El código del proveedor debe tener entre 5 y 20 caracteres.")
    private String codProv;  // Código del proveedor

   // @NotNull(message = "El stock disponible no puede ser nulo.")
    @DecimalMin(value = "0.0", inclusive = false, message = "El stock disponible debe ser mayor que 0.")
    private BigDecimal stockLib;  // Stock disponible

   // @NotNull(message = "La fecha de compra no puede ser nula.")
    private LocalDate fCompra;  // Fecha de compra

   // @NotNull(message = "La cantidad no puede ser nula.")
    @DecimalMin(value = "0.0", inclusive = false, message = "La cantidad debe ser mayor que 0.")
    private BigDecimal cantidad;  // Cantidad del producto

   // @NotNull(message = "El stock a diciembre 2023 no puede ser nulo.")
    @DecimalMin(value = "0.0", inclusive = false, message = "El stock a diciembre 2023 debe ser mayor que 0.")
    private BigDecimal stDic2023;  // Stock a diciembre 2023

    //@NotNull(message = "Las compras realizadas no pueden ser nulas.")
    @DecimalMin(value = "0.0", inclusive = false, message = "Las compras realizadas deben ser mayores que 0.")
    private BigDecimal compras;  // Compras realizadas

   // @NotNull(message = "Las ventas realizadas no pueden ser nulas.")
    @DecimalMin(value = "0.0", inclusive = false, message = "Las ventas realizadas deben ser mayores que 0.")
    private BigDecimal ventas;  // Ventas realizadas

   // @NotNull(message = "El stock a abril 2024 no puede ser nulo.")
    @DecimalMin(value = "0.0", inclusive = false, message = "El stock a abril 2024 debe ser mayor que 0.")
    private BigDecimal stAbr2024;  // Stock a abril 2024

    // ID del proveedor (referencia en lugar del objeto completo)
   // @NotNull(message = "El ID del proveedor no puede ser nulo.")
    private Long proveedorId;  // ID del proveedor




}
