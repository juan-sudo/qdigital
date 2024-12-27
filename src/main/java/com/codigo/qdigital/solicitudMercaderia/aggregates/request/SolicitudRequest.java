package com.codigo.qdigital.solicitudMercaderia.aggregates.request;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.DetalleSolicitudDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


public class SolicitudRequest {

    @NotNull(message = "El tSolicitud no puede ser nulo.")
    @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.")
    private String tSolicitud;

    @NotNull(message = "El tSolicitud no puede ser nulo.")
    @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.")
    private String tOperacion;

    @Size(min = 1, max = 3, message = "El tOperacion  debe tener entre 1 y 3  caracteres.")
    private String estado;

    private Long guia;

    private String responsable;

    private List<DetalleSolicitudRequest> detalles;

    public SolicitudRequest() {
    }

    public SolicitudRequest(String tSolicitud, String tOperacion, String estado, Long guia, String responsable, List<DetalleSolicitudRequest> detalles) {
        this.tSolicitud = tSolicitud;
        this.tOperacion = tOperacion;
        this.estado = estado;
        this.guia = guia;
        this.responsable = responsable;
        this.detalles = detalles;
    }

    public @NotNull(message = "El tSolicitud no puede ser nulo.") @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.") String gettSolicitud() {
        return tSolicitud;
    }

    public void settSolicitud(@NotNull(message = "El tSolicitud no puede ser nulo.") @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.") String tSolicitud) {
        this.tSolicitud = tSolicitud;
    }

    public @NotNull(message = "El tSolicitud no puede ser nulo.") @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.") String gettOperacion() {
        return tOperacion;
    }

    public void settOperacion(@NotNull(message = "El tSolicitud no puede ser nulo.") @Size(min = 1, max = 3, message = "El tSolicitud del producto debe tener entre 1 y 3 caracteres.") String tOperacion) {
        this.tOperacion = tOperacion;
    }

    public @Size(min = 1, max = 3, message = "El tOperacion  debe tener entre 1 y 3  caracteres.") String getEstado() {
        return estado;
    }

    public void setEstado(@Size(min = 1, max = 3, message = "El tOperacion  debe tener entre 1 y 3  caracteres.") String estado) {
        this.estado = estado;
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

    public List<DetalleSolicitudRequest> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleSolicitudRequest> detalles) {
        this.detalles = detalles;
    }
}
