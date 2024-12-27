package com.codigo.qdigital.solicitudMercaderia.aggregates.dto;

import com.codigo.qdigital.solicitudMercaderia.entity.DetalleSolicitudMercaderiaEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SolicitudDTO {

    private Long nSolicitud;
    private String tSolicitud;
    private String tOperacion;
    private String estado;
    private LocalDate fecha;
    private Long guia;
    private String responsable;
    private List<DetalleSolicitudDTO> detalles;

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

    public List<DetalleSolicitudDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleSolicitudDTO> detalles) {
        this.detalles = detalles;
    }
}
