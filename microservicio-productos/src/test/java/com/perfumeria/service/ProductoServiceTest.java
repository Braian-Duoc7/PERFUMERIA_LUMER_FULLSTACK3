package com.perfumeria.service;

import com.perfumeria.model.Producto;
import com.perfumeria.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest {

    @Mock
    private ProductoRepository repository;

    @InjectMocks
    private ProductoService service;

    private Producto producto;

    @BeforeEach
    void setUp() {
        producto = new Producto("Perfume Premium", "Marca A", 89.99, "Aroma único", "img.jpg", 100);
        producto.setId(1L);
    }

    @Test
    void testObtenerTodos() {
        List<Producto> productos = Arrays.asList(producto);
        when(repository.findAll()).thenReturn(productos);

        List<Producto> result = service.obtenerTodos();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testObtenerPorId() {
        when(repository.findById(1L)).thenReturn(Optional.of(producto));

        Optional<Producto> result = service.obtenerPorId(1L);

        assertTrue(result.isPresent());
        assertEquals("Perfume Premium", result.get().getNombre());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testObtenerPorIdNoEncontrado() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        Optional<Producto> result = service.obtenerPorId(999L);

        assertFalse(result.isPresent());
        verify(repository, times(1)).findById(999L);
    }

    @Test
    void testCrear() {
        when(repository.save(producto)).thenReturn(producto);

        Producto result = service.crear(producto);

        assertNotNull(result);
        assertEquals("Perfume Premium", result.getNombre());
        assertEquals(89.99, result.getPrecio());
        verify(repository, times(1)).save(producto);
    }

    @Test
    void testActualizar() {
        Producto productoActualizado = new Producto("Perfume Actualizado", "Marca B", 99.99, "Nuevo aroma", "img2.jpg", 50);

        when(repository.findById(1L)).thenReturn(Optional.of(producto));
        when(repository.save(any(Producto.class))).thenReturn(productoActualizado);

        Producto result = service.actualizar(1L, productoActualizado);

        assertNotNull(result);
        assertEquals("Perfume Actualizado", result.getNombre());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(any(Producto.class));
    }

    @Test
    void testEliminar() {
        doNothing().when(repository).deleteById(1L);

        service.eliminar(1L);

        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testValidacionStock() {
        assertNotNull(producto.getStock());
        assertEquals(100, producto.getStock());
    }

    @Test
    void testValidacionPrecio() {
        assertTrue(producto.getPrecio() > 0);
        assertEquals(89.99, producto.getPrecio());
    }
}
