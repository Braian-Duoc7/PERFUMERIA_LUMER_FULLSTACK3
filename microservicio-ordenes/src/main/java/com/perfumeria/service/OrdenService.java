package com.perfumeria.service;

import com.perfumeria.model.Orden;
import com.perfumeria.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {
    @Autowired
    private OrdenRepository repository;

    public List<Orden> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<Orden> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Orden crear(Orden orden) {
        orden.setFecha(LocalDateTime.now());
        orden.setEstado("PENDIENTE");
        return repository.save(orden);
    }

    public Orden actualizar(Long id, Orden orden) {
        return repository.findById(id).map(o -> {
            o.setItems(orden.getItems());
            o.setTotal(orden.getTotal());
            o.setEstado(orden.getEstado());
            return repository.save(o);
        }).orElseThrow();
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
