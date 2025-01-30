package com.codigo.qdigital.solicitudMercaderia.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="productoss")

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generar automáticamente el ID
    @Column(name = "id")
    private Long id;  // Nuevo campo como clave primaria

    @Column(name = "producto", unique = true, nullable = false) // Ya no es la clave primaria
    private String producto;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "c_neto")
    private BigDecimal cNeto;

    @Column(name = "cod_prov")
    private String codProv;

    @Column(name = "stock_lib")
    private BigDecimal stockLib;

    @Column(name = "f_compra")
    private LocalDate fCompra;

    @Column(name = "cantidad")
    private BigDecimal cantidad;

    @Column(name = "st_dic2023")
    private BigDecimal stDic2023;

    @Column(name = "compras")
    private BigDecimal compras;

    @Column(name = "ventas")
    private BigDecimal ventas;

    @Column(name = "st_abr2024")
    private BigDecimal stAbr2024;

    @JsonIgnore  // Evitar la serialización de la relación con ProveedorEntity
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id_proveedores")
    private ProveedorEntity proveedor;

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

    public BigDecimal getcNeto() {
        return cNeto;
    }

    public void setcNeto(BigDecimal cNeto) {
        this.cNeto = cNeto;
    }

    public String getCodProv() {
        return codProv;
    }

    public void setCodProv(String codProv) {
        this.codProv = codProv;
    }

    public BigDecimal getStockLib() {
        return stockLib;
    }

    public void setStockLib(BigDecimal stockLib) {
        this.stockLib = stockLib;
    }

    public LocalDate getfCompra() {
        return fCompra;
    }

    public void setfCompra(LocalDate fCompra) {
        this.fCompra = fCompra;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getStDic2023() {
        return stDic2023;
    }

    public void setStDic2023(BigDecimal stDic2023) {
        this.stDic2023 = stDic2023;
    }

    public BigDecimal getCompras() {
        return compras;
    }

    public void setCompras(BigDecimal compras) {
        this.compras = compras;
    }

    public BigDecimal getVentas() {
        return ventas;
    }

    public void setVentas(BigDecimal ventas) {
        this.ventas = ventas;
    }

    public BigDecimal getStAbr2024() {
        return stAbr2024;
    }

    public void setStAbr2024(BigDecimal stAbr2024) {
        this.stAbr2024 = stAbr2024;
    }

    public ProveedorEntity getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorEntity proveedor) {
        this.proveedor = proveedor;
    }
}
