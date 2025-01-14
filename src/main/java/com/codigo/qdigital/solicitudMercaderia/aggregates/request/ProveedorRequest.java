package com.codigo.qdigital.solicitudMercaderia.aggregates.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class    ProveedorRequest {

    @NotNull(message = "El código del proveedor no puede ser nulo.")
    @Size(min = 5, max = 20, message = "El código del proveedor debe tener entre 5 y 20 caracteres.")
    private String codigoProveedor;

    @NotNull(message = "El nombre del proveedor no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del proveedor debe tener entre 3 y 100 caracteres.")
    private String nombre;

    @Size(max = 200, message = "La dirección no puede exceder los 200 caracteres.")
    private String direccion;

    @Size(max = 20, message = "El número de teléfono no puede exceder los 20 caracteres.")
    private String fono1; // Cambiado a String

    @Size(max = 50, message = "La ciudad no puede exceder los 50 caracteres.")
    private String ciudad;

    @Size(max = 100, message = "La atención no puede exceder los 100 caracteres.")
    private String atencion;

    @Size(max = 50, message = "El número de celular no puede exceder los 50 caracteres.")
    private String celuVenta;

    @Size(max = 50, message = "La ciudad de venta no puede exceder los 50 caracteres.")
    private String ciudadVen;

    @Min(value = 0, message = "El administrador del proveedor debe ser mayor o igual a 0.")
    private BigDecimal adminProveedor;

    @Min(value = 0, message = "La pérdida debe ser mayor o igual a 0.")
    private BigDecimal perdida;

    @Min(value = 0, message = "El flete debe ser mayor o igual a 0.")
    private BigDecimal flete;

    @Min(value = 0, message = "El método de pago debe ser mayor o igual a 0.")
    private BigDecimal condPago;

    @Min(value = 0, message = "Los días deben ser mayores o iguales a 0.")
    private Integer nDias;

    @Min(value = 0, message = "El documento debe ser mayor o igual a 0.")
    private BigDecimal docto;

    @Size(max = 255, message = "El archivo adjunto no puede exceder los 255 caracteres.")
    private String chAdj;

    @Email(message = "El correo debe tener un formato válido.")
    @Size(max = 255, message = "El correo no puede tener más de 255 caracteres.")
    private String correo;

    private SignUpRequest usuario;

    private List<ProductoRequest> productos; // Lista de productos relacionados


}
