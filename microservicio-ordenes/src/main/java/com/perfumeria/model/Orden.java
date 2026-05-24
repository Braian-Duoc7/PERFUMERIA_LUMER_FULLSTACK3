package com.perfumeria.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ordenes")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String items;
    private Double total;
    private LocalDateTime fecha;
    private String estado;

    public Orden() {}

    public Orden(String items, Double total, LocalDateTime fecha, String estado) {
        this.items = items;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public String getItems() { return items; }
    public Double getTotal() { return total; }
    public LocalDateTime getFecha() { return fecha; }
    public String getEstado() { return estado; }

    public void setItems(String items) { this.items = items; }
    public void setTotal(Double total) { this.total = total; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public void setEstado(String estado) { this.estado = estado; }
}
