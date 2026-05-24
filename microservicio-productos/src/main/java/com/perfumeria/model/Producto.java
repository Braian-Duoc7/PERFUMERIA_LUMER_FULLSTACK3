package com.perfumeria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String marca;
    private Double precio;
    private String descripcion;
    private String imagen;
    private Integer stock;

    public Producto() {}

    public Producto(String nombre, String marca, Double precio, String descripcion, String imagen, Integer stock) {
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.stock = stock;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getMarca() { return marca; }
    public Double getPrecio() { return precio; }
    public String getDescripcion() { return descripcion; }
    public String getImagen() { return imagen; }
    public Integer getStock() { return stock; }

    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setMarca(String marca) { this.marca = marca; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    public void setStock(Integer stock) { this.stock = stock; }
}
