package com.perfumeria.controller;

import com.perfumeria.model.Producto;
import com.perfumeria.service.ProductoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductoControllerTest {

    @Mock
    private ProductoService service;

    @InjectMocks
    private ProductoController controller;

    private Producto producto;

    @BeforeEach
    void setUp() {
        producto = new Producto("Perfume Premium", "Marca A", 89.99, "Aroma único", "img.jpg", 100);
        producto.setId(1L);
    }

    @Test
    void testObtenerTodos() {
        List<Producto> productos = Arrays.asList(producto);
        when(service.obtenerTodos()).thenReturn(productos);

        ResponseEntity<List<Producto>> response = controller.obtenerTodos();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(service, times(1)).obtenerTodos();
    }

    @Test
    void testObtenerPorId() {
        when(service.obtenerPorId(1L)).thenReturn(Optional.of(producto));

        ResponseEntity<Producto> response = controller.obtenerPorId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Perfume Premium", response.getBody().getNombre());
        verify(service, times(1)).obtenerPorId(1L);
    }

    @Test
    void testObtenerPorIdNoEncontrado() {
        when(service.obtenerPorId(999L)).thenReturn(Optional.empty());

        ResponseEntity<Producto> response = controller.obtenerPorId(999L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(service, times(1)).obtenerPorId(999L);
    }

    @Test
    void testCrear() {
        when(service.crear(producto)).thenReturn(producto);

        ResponseEntity<Producto> response = controller.crear(producto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(service, times(1)).crear(producto);
    }

    @Test
    void testActualizar() {
        Producto productoActualizado = new Producto("Actualizado", "Marca B", 99.99, "Desc", "img.jpg", 50);
        when(service.actualizar(1L, productoActualizado)).thenReturn(productoActualizado);

        ResponseEntity<Producto> response = controller.actualizar(1L, productoActualizado);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service, times(1)).actualizar(1L, productoActualizado);
    }

    @Test
    void testEliminar() {
        doNothing().when(service).eliminar(1L);

        ResponseEntity<Void> response = controller.eliminar(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(service, times(1)).eliminar(1L);
    }
}
