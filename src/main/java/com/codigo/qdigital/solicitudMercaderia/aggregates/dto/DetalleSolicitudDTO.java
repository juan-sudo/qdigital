package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DetalleSolicitudDTO {
    private Long id;
    private String producto;
    private String nombre;
    private BigDecimal cantidad;
    private String marca;
    private String cliente;
    private String observ;
    private LocalDate fComprom;
    private String proveedor;
    private String nCompra;
    private ProductoDTO productoExistente;
    private SolicitudDTO solicitudMercaderia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
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

    public ProductoDTO getProductoExistente() {
        return productoExistente;
    }

    public void setProductoExistente(ProductoDTO productoExistente) {
        this.productoExistente = productoExistente;
    }

    public SolicitudDTO getSolicitudMercaderia() {
        return solicitudMercaderia;
    }

    public void setSolicitudMercaderia(SolicitudDTO solicitudMercaderia) {
        this.solicitudMercaderia = solicitudMercaderia;
    }
}
