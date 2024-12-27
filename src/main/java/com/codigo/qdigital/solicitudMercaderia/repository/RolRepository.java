package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.RolEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RolRepository extends JpaRepository<RolEntity,Long> {

    Optional<RolEntity> findByNombreRol(String rol);

    List<RolEntity> findAllByOrderByIdRolAsc();
}
