package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProveedoresRepository extends JpaRepository<ProveedorEntity, Long> {
    Optional<ProveedorEntity> findByIdProveedores(Long codigoProveedor);

}
