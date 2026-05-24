package com.perfumeria.controller;

import com.perfumeria.model.Orden;
import com.perfumeria.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenController {
    @Autowired
    private OrdenService service;

    @GetMapping
    public ResponseEntity<List<Orden>> obtenerTodas() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden orden) {
        return ResponseEntity.ok(service.crear(orden));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orden> actualizar(@PathVariable Long id, @RequestBody Orden orden) {
        return ResponseEntity.ok(service.actualizar(id, orden));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
