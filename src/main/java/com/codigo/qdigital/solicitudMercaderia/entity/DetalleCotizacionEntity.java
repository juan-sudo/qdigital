package com.codigo.qdigital.solicitudMercaderia.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name="detalle_cotizaciones")

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetalleCotizacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generar automáticamente el ID
    @Column(name = "id")
    private Long id;  // Nuevo campo como clave primaria

    private Long cantidad;

    @JsonIgnore  // Evitar la serialización de la relación con ProveedorEntity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", referencedColumnName = "id")
    private ProductoEntity producto;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cotizacion", referencedColumnName = "id")  // Corregido
    private CotizacionEntity cotizacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public ProductoEntity getProducto() {
        return producto;
    }

    public void setProducto(ProductoEntity producto) {
        this.producto = producto;
    }

    public CotizacionEntity getCotizacion() {
        return cotizacion;
    }

    public void setCotizacion(CotizacionEntity cotizacion) {
        this.cotizacion = cotizacion;
    }
}
