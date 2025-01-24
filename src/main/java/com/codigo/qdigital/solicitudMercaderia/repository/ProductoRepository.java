package com.codigo.qdigital.solicitudMercaderia.repository;

import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
    Optional<ProductoEntity> findByProducto(String codigoProducto);

    //ELIMINACION CON REALACIOn
    @Modifying
    @Transactional
    @Query("DELETE FROM ProductoEntity p WHERE p.proveedor.idProveedores = :idProveedor")
    void deleteByProveedorId(@Param("idProveedor") Long idProveedor);


    // Búsqueda de productos por idProveedor
    @Query("SELECT p FROM ProductoEntity p WHERE p.proveedor.idProveedores = :idProveedor")
    List<ProductoEntity> findProductosByProveedorId(@Param("idProveedor") Long idProveedor);
}
