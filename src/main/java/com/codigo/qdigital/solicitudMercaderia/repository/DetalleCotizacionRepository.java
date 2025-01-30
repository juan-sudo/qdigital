package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.CotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.DetalleCotizacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleCotizacionRepository extends JpaRepository<DetalleCotizacionEntity, Long> {

}
