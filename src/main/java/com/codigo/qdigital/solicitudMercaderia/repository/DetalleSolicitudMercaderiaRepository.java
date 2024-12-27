package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.DetalleSolicitudMercaderiaEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleSolicitudMercaderiaRepository extends JpaRepository<DetalleSolicitudMercaderiaEntity, Long> {
  //  Optional<ProductoEntity> findByProducto(String codigoProducto);

}
