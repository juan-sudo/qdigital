package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ProveedoresRepository extends JpaRepository<ProveedorEntity, Long> {
    Optional<ProveedorEntity> findByIdProveedores(Long codigoProveedor);

    @Query("SELECT p FROM ProveedorEntity p WHERE p.idProveedores = :id")
    Optional<ProveedorEntity> findByIdWithoutProducto(@Param("id") Long id);



}
