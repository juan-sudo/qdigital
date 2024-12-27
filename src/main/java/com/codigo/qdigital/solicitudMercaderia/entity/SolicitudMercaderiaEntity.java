package com.codigo.qdigital.solicitudMercaderia.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="solicitudess")  // Corregido el nombre de la tabla para coincidir con la consulta
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudMercaderiaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "n_solicitu")  // Asegúrate de que el nombre de la columna sea correcto
    private Long nSolicitud;

    @Column(name = "t_solicitu")
    private String tSolicitud;

    @Column(name = "t_operacio")
    private String tOperacion;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "guia")
    private Long guia;

    @Column(name = "responsable")
    private String responsable;

    // Relación uno a muchos con DetalleSolicitudMercaderiaEntity
    @OneToMany(mappedBy = "solicitudMercaderia", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<DetalleSolicitudMercaderiaEntity> detalles;

    public Long getnSolicitud() {
        return nSolicitud;
    }

    public void setnSolicitud(Long nSolicitud) {
        this.nSolicitud = nSolicitud;
    }

    public String gettSolicitud() {
        return tSolicitud;
    }

    public void settSolicitud(String tSolicitud) {
        this.tSolicitud = tSolicitud;
    }

    public String gettOperacion() {
        return tOperacion;
    }

    public void settOperacion(String tOperacion) {
        this.tOperacion = tOperacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Long getGuia() {
        return guia;
    }

    public void setGuia(Long guia) {
        this.guia = guia;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public Set<DetalleSolicitudMercaderiaEntity> getDetalles() {
        return detalles;
    }

    public void setDetalles(Set<DetalleSolicitudMercaderiaEntity> detalles) {
        this.detalles = detalles;
    }
}
