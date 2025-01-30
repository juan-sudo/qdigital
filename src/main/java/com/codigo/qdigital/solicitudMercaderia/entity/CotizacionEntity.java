package com.codigo.qdigital.solicitudMercaderia.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;


@Entity
@Table(name="cotizaciones")

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CotizacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generar automáticamente el ID
    @Column(name = "id")
    private Long id;  // Nuevo campo como clave primaria

    private String numero;

    @Column(name = "fecha_cotizacion")
    private LocalDate fechaCotizacion;

    private String responsable;


    @JsonIgnore  // Evitar la serialización de la relación con ProveedorEntity
    @ManyToOne(fetch = FetchType.LAZY)  // Se cambia a LAZY
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id_proveedores")
    private ProveedorEntity proveedor;

    // Relación bidireccional: un proveedor tiene una lista de productos
    @JsonIgnoreProperties("detalleCotizacion")
    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<DetalleCotizacionEntity> detalleCotizacion;  // Relación con la entidad Productos

    @PrePersist
    public void prePersist() {
        if (fechaCotizacion == null) {
            fechaCotizacion = LocalDate.now();  // Asignar la fecha de publicación si es nula
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getFechaCotizacion() {
        return fechaCotizacion;
    }

    public void setFechaCotizacion(LocalDate fechaCotizacion) {
        this.fechaCotizacion = fechaCotizacion;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public ProveedorEntity getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorEntity proveedor) {
        this.proveedor = proveedor;
    }

    public Set<DetalleCotizacionEntity> getDetalleCotizacion() {
        return detalleCotizacion;
    }

    public void setDetalleCotizacion(Set<DetalleCotizacionEntity> detalleCotizacion) {
        this.detalleCotizacion = detalleCotizacion;
    }
}
