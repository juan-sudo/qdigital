package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SolicitudMercaderiaRepository extends JpaRepository<SolicitudMercaderiaEntity, Long> {

  Optional<SolicitudMercaderiaEntity> findByNSolicitud(Long nSolicitud);

}
