package com.perfumeria.service;

import com.perfumeria.model.Producto;
import com.perfumeria.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository repository;

    public List<Producto> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Producto crear(Producto producto) {
        return repository.save(producto);
    }

    public Producto actualizar(Long id, Producto producto) {
        return repository.findById(id).map(p -> {
            p.setNombre(producto.getNombre());
            p.setMarca(producto.getMarca());
            p.setPrecio(producto.getPrecio());
            p.setDescripcion(producto.getDescripcion());
            p.setImagen(producto.getImagen());
            return repository.save(p);
        }).orElseThrow();
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
