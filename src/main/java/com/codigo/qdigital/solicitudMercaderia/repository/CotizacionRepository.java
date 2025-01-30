package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.CotizacionEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CotizacionRepository extends JpaRepository<CotizacionEntity, Long> {

    // Obtener el número de la última cotización, asegurándose de que solo se devuelva uno
    @Query("SELECT c.numero FROM CotizacionEntity c ORDER BY c.id DESC")
    List<String> getLastCotizacionNumero();

    // Consulta personalizada con orden descendente por ID
    @Query("SELECT c FROM CotizacionEntity c ORDER BY c.id DESC")
    List<CotizacionEntity> findAllCotizacionesDesc();
}
