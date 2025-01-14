package com.codigo.qdigital.solicitudMercaderia.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;


@Entity
@Table(name="proveedoress")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProveedorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proveedores_id_proveedores_seq")
    @SequenceGenerator(name = "proveedores_id_proveedores_seq", sequenceName = "proveedores_id_proveedores_seq", allocationSize = 1)
    @Column(name = "id_proveedores")
    private Long idProveedores;

    @Column(name = "codigo_proveedor", unique = true, nullable = false)
    private String codigoProveedor;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "fono_1")
    private String fono1; // Cambiado de Double a String

    @Column(name = "ciudad")
    private String ciudad;

    @Column(name = "atencion")
        private String atencion;

    @Column(name = "celu_venta")
    private String celuVenta;
    
    @Column(name = "ciudad_ven")
    private String ciudadVen;

    @Column(name = "admin_proveedor")
    private BigDecimal adminProveedor; // Cambiado de Double a BigDecimal

    @Column(name = "perdida")
    private BigDecimal perdida; // Cambiado de Double a BigDecimal

    @Column(name = "flete")
    private BigDecimal flete; // Cambiado de Double a BigDecimal

    @Column(name = "cond_pago")
    private BigDecimal condPago; // Cambiado de Double a BigDecimal

    @Column(name = "n_dias")
    private Integer nDias; // Cambiado de Double a Integer

    @Column(name = "docto")
    private BigDecimal docto; // Cambiado de Double a BigDecimal

    @Column(name = "ch_adj")
    private String chAdj;

    private String correo;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;  // Fecha de publicación del producto

    @PrePersist
    public void prePersist() {
        if (fechaRegistro == null) {
            fechaRegistro = LocalDateTime.now();  // Asignar la fecha de publicación si es nula
        }

    }
    @JsonIgnoreProperties("usuario")
    @ManyToOne(fetch = FetchType.LAZY, optional = true) // Relación opcional
    @JoinColumn(name = "id_usuario", nullable = true)  // Se permite nulo
    private UsuarioEntity usuario;


    // Relación bidireccional: un proveedor tiene una lista de productos
    @JsonIgnoreProperties("producto")
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductoEntity> producto;  // Relación con la entidad Productos


    public Long getIdProveedores() {
        return idProveedores;
    }

    public void setIdProveedores(Long idProveedores) {
        this.idProveedores = idProveedores;
    }

    public String getCodigoProveedor() {
        return codigoProveedor;
    }

    public void setCodigoProveedor(String codigoProveedor) {
        this.codigoProveedor = codigoProveedor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFono1() {
        return fono1;
    }

    public void setFono1(String fono1) {
        this.fono1 = fono1;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getAtencion() {
        return atencion;
    }

    public void setAtencion(String atencion) {
        this.atencion = atencion;
    }

    public String getCeluVenta() {
        return celuVenta;
    }

    public void setCeluVenta(String celuVenta) {
        this.celuVenta = celuVenta;
    }

    public String getCiudadVen() {
        return ciudadVen;
    }

    public void setCiudadVen(String ciudadVen) {
        this.ciudadVen = ciudadVen;
    }

    public BigDecimal getAdminProveedor() {
        return adminProveedor;
    }

    public void setAdminProveedor(BigDecimal adminProveedor) {
        this.adminProveedor = adminProveedor;
    }

    public BigDecimal getPerdida() {
        return perdida;
    }

    public void setPerdida(BigDecimal perdida) {
        this.perdida = perdida;
    }

    public BigDecimal getFlete() {
        return flete;
    }

    public void setFlete(BigDecimal flete) {
        this.flete = flete;
    }

    public BigDecimal getCondPago() {
        return condPago;
    }

    public void setCondPago(BigDecimal condPago) {
        this.condPago = condPago;
    }

    public Integer getnDias() {
        return nDias;
    }

    public void setnDias(Integer nDias) {
        this.nDias = nDias;
    }

    public BigDecimal getDocto() {
        return docto;
    }

    public void setDocto(BigDecimal docto) {
        this.docto = docto;
    }

    public String getChAdj() {
        return chAdj;
    }

    public void setChAdj(String chAdj) {
        this.chAdj = chAdj;
    }

    public Set<ProductoEntity> getProducto() {
        return producto;
    }

    public void setProducto(Set<ProductoEntity> producto) {
        this.producto = producto;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
