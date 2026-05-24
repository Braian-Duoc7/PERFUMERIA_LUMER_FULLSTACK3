package com.perfumeria.controller;

import com.perfumeria.model.Orden;
import com.perfumeria.service.OrdenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrdenControllerTest {

    @Mock
    private OrdenService service;

    @InjectMocks
    private OrdenController controller;

    private Orden orden;

    @BeforeEach
    void setUp() {
        orden = new Orden("[{\"productoId\": 1, \"cantidad\": 2}]", 179.98, LocalDateTime.now(), "PENDIENTE");
        orden.setId(1L);
    }

    @Test
    void testObtenerTodas() {
        List<Orden> ordenes = Arrays.asList(orden);
        when(service.obtenerTodas()).thenReturn(ordenes);

        ResponseEntity<List<Orden>> response = controller.obtenerTodas();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(service, times(1)).obtenerTodas();
    }

    @Test
    void testObtenerPorId() {
        when(service.obtenerPorId(1L)).thenReturn(Optional.of(orden));

        ResponseEntity<Orden> response = controller.obtenerPorId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(179.98, response.getBody().getTotal());
        verify(service, times(1)).obtenerPorId(1L);
    }

    @Test
    void testObtenerPorIdNoEncontrado() {
        when(service.obtenerPorId(999L)).thenReturn(Optional.empty());

        ResponseEntity<Orden> response = controller.obtenerPorId(999L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(service, times(1)).obtenerPorId(999L);
    }

    @Test
    void testCrear() {
        when(service.crear(orden)).thenReturn(orden);

        ResponseEntity<Orden> response = controller.crear(orden);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("PENDIENTE", response.getBody().getEstado());
        verify(service, times(1)).crear(orden);
    }

    @Test
    void testActualizar() {
        Orden ordenActualizada = new Orden("[{\"productoId\": 2, \"cantidad\": 3}]", 269.97, LocalDateTime.now(), "CONFIRMADA");
        when(service.actualizar(1L, ordenActualizada)).thenReturn(ordenActualizada);

        ResponseEntity<Orden> response = controller.actualizar(1L, ordenActualizada);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("CONFIRMADA", response.getBody().getEstado());
        verify(service, times(1)).actualizar(1L, ordenActualizada);
    }

    @Test
    void testEliminar() {
        doNothing().when(service).eliminar(1L);

        ResponseEntity<Void> response = controller.eliminar(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(service, times(1)).eliminar(1L);
    }

    @Test
    void testCrearOrdenConValidaciones() {
        assertTrue(orden.getTotal() > 0);
        assertNotNull(orden.getEstado());
        assertNotNull(orden.getFecha());
    }
}
