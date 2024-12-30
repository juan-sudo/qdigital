    package com.codigo.qdigital.solicitudMercaderia.entity;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import jakarta.persistence.*;
    import lombok.*;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Entity
    @Table(name = "detalle_solicitudess")  // Corregido el nombre de la tabla para coincidir con la consulta
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class DetalleSolicitudMercaderiaEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name = "producto")
        private String producto;

        @Column(name = "nombre")
        private String nombre;

        @Column(name = "cantidad")
        private BigDecimal cantidad;

        @Column(name = "marca")
        private String marca;

        @Column(name = "cliente")
        private String cliente;

        @Column(name = "observ")
        private String observ;

        @Column(name = "f_comprom")
        private LocalDate fComprom;

        @Column(name = "proveedor")
        private String proveedor;

        @Column(name = "n_compra")
        private String nCompra;

        //    @JsonIgnore
        // Producto relacionado (puede ser null)
        @JsonIgnoreProperties("productoExistente")
        @ManyToOne(fetch = FetchType.LAZY, optional = tru       e) // Relación opcional
        @JoinColumn(name = "id_producto", nullable = true)  // Se permite nulo
        private ProductoEntity productoExistente;

        // Relación muchos a uno con SolicitudMercaderiaEntity
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "n_solicitu", referencedColumnName = "n_solicitu")
        @JsonIgnore // Evita serializar esta propiedad
        private SolicitudMercaderiaEntity solicitudMercaderia;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getProducto() {
            return producto;
        }

        public void setProducto(String producto) {
            this.producto = producto;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public BigDecimal getCantidad() {
            return cantidad;
        }

        public void setCantidad(BigDecimal cantidad) {
            this.cantidad = cantidad;
        }

        public String getMarca() {
            return marca;
        }

        public void setMarca(String marca) {
            this.marca = marca;
        }

        public String getCliente() {
            return cliente;
        }

        public void setCliente(String cliente) {
            this.cliente = cliente;
        }

        public String getObserv() {
            return observ;
        }

        public void setObserv(String observ) {
            this.observ = observ;
        }

        public LocalDate getfComprom() {
            return fComprom;
        }

        public void setfComprom(LocalDate fComprom) {
            this.fComprom = fComprom;
        }

        public String getProveedor() {
            return proveedor;
        }

        public void setProveedor(String proveedor) {
            this.proveedor = proveedor;
        }

        public String getnCompra() {
            return nCompra;
        }

        public void setnCompra(String nCompra) {
            this.nCompra = nCompra;
        }

        public ProductoEntity getProductoExistente() {
            return productoExistente;
        }

        public void setProductoExistente(ProductoEntity productoExistente) {
            this.productoExistente = productoExistente;
        }

        public SolicitudMercaderiaEntity getSolicitudMercaderia() {
            return solicitudMercaderia;
        }

        public void setSolicitudMercaderia(SolicitudMercaderiaEntity solicitudMercaderia) {
            this.solicitudMercaderia = solicitudMercaderia;
        }
    }
