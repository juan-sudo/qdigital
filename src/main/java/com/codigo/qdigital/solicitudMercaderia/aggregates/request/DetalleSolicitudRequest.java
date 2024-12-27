package com.codigo.qdigital.solicitudMercaderia.aggregates.request;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;


public class DetalleSolicitudRequest {
    @NotNull(message = "El producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String producto;
    @NotNull(message = "El producto no puede ser nulo.")
    @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.")
    private String nombre;

    @NotNull(message = "La cantidad no puede ser nula.")
    @DecimalMin(value = "0.0", inclusive = false, message = "La cantidad debe ser mayor que 0.")
    private BigDecimal cantidad;

    private String marca;

    private String cliente;

    private String observ;

    private LocalDate fComprom;

    private String proveedor;

    private String nCompra;

    private Long idproductoExistente;

    private SolicitudRequest solicitudMercaderia;

    public DetalleSolicitudRequest() {
    }

    public DetalleSolicitudRequest(String producto, String nombre, BigDecimal cantidad, String marca, String cliente, String observ, LocalDate fComprom, String proveedor, String nCompra, Long idproductoExistente, SolicitudRequest solicitudMercaderia) {
        this.producto = producto;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.marca = marca;
        this.cliente = cliente;
        this.observ = observ;
        this.fComprom = fComprom;
        this.proveedor = proveedor;
        this.nCompra = nCompra;
        this.idproductoExistente = idproductoExistente;
        this.solicitudMercaderia = solicitudMercaderia;
    }

    public @NotNull(message = "El producto no puede ser nulo.") @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.") String getProducto() {
        return producto;
    }

    public void setProducto(@NotNull(message = "El producto no puede ser nulo.") @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.") String producto) {
        this.producto = producto;
    }

    public @NotNull(message = "El producto no puede ser nulo.") @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.") String getNombre() {
        return nombre;
    }

    public void setNombre(@NotNull(message = "El producto no puede ser nulo.") @Size(min = 3, max = 100, message = "El nombre del producto debe tener entre 3 y 100 caracteres.") String nombre) {
        this.nombre = nombre;
    }

    public @NotNull(message = "La cantidad no puede ser nula.") @DecimalMin(value = "0.0", inclusive = false, message = "La cantidad debe ser mayor que 0.") BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(@NotNull(message = "La cantidad no puede ser nula.") @DecimalMin(value = "0.0", inclusive = false, message = "La cantidad debe ser mayor que 0.") BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getObserv() {
        return observ;
    }

    public void setObserv(String observ) {
        this.observ = observ;
    }

    public LocalDate getfComprom() {
        return fComprom;
    }

    public void setfComprom(LocalDate fComprom) {
        this.fComprom = fComprom;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getnCompra() {
        return nCompra;
    }

    public void setnCompra(String nCompra) {
        this.nCompra = nCompra;
    }

    public Long getIdproductoExistente() {
        return idproductoExistente;
    }

    public void setIdproductoExistente(Long idproductoExistente) {
        this.idproductoExistente = idproductoExistente;
    }

    public SolicitudRequest getSolicitudMercaderia() {
        return solicitudMercaderia;
    }

    public void setSolicitudMercaderia(SolicitudRequest solicitudMercaderia) {
        this.solicitudMercaderia = solicitudMercaderia;
    }
}
