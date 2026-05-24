package com.perfumeria.service;

import com.perfumeria.model.Orden;
import com.perfumeria.repository.OrdenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrdenServiceTest {

    @Mock
    private OrdenRepository repository;

    @InjectMocks
    private OrdenService service;

    private Orden orden;

    @BeforeEach
    void setUp() {
        orden = new Orden("[{\"productoId\": 1, \"cantidad\": 2}]", 179.98, LocalDateTime.now(), "PENDIENTE");
        orden.setId(1L);
    }

    @Test
    void testObtenerTodas() {
        List<Orden> ordenes = Arrays.asList(orden);
        when(repository.findAll()).thenReturn(ordenes);

        List<Orden> result = service.obtenerTodas();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testObtenerPorId() {
        when(repository.findById(1L)).thenReturn(Optional.of(orden));

        Optional<Orden> result = service.obtenerPorId(1L);

        assertTrue(result.isPresent());
        assertEquals(179.98, result.get().getTotal());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testObtenerPorIdNoEncontrado() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        Optional<Orden> result = service.obtenerPorId(999L);

        assertFalse(result.isPresent());
        verify(repository, times(1)).findById(999L);
    }

    @Test
    void testCrear() {
        Orden nuevaOrden = new Orden("[{\"productoId\": 1, \"cantidad\": 1}]", 89.99, null, null);
        Orden ordenCreada = new Orden("[{\"productoId\": 1, \"cantidad\": 1}]", 89.99, LocalDateTime.now(), "PENDIENTE");
        ordenCreada.setId(2L);

        when(repository.save(any(Orden.class))).thenReturn(ordenCreada);

        Orden result = service.crear(nuevaOrden);

        assertNotNull(result);
        assertEquals("PENDIENTE", result.getEstado());
        assertNotNull(result.getFecha());
        verify(repository, times(1)).save(any(Orden.class));
    }

    @Test
    void testActualizar() {
        Orden ordenActualizada = new Orden("[{\"productoId\": 2, \"cantidad\": 3}]", 269.97, LocalDateTime.now(), "CONFIRMADA");

        when(repository.findById(1L)).thenReturn(Optional.of(orden));
        when(repository.save(any(Orden.class))).thenReturn(ordenActualizada);

        Orden result = service.actualizar(1L, ordenActualizada);

        assertNotNull(result);
        assertEquals("CONFIRMADA", result.getEstado());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(any(Orden.class));
    }

    @Test
    void testEliminar() {
        doNothing().when(repository).deleteById(1L);

        service.eliminar(1L);

        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testValidacionTotal() {
        assertTrue(orden.getTotal() > 0);
        assertEquals(179.98, orden.getTotal());
    }

    @Test
    void testValidacionEstado() {
        assertNotNull(orden.getEstado());
        assertTrue(Arrays.asList("PENDIENTE", "CONFIRMADA", "ENVIADA", "ENTREGADA", "CANCELADA")
                .contains(orden.getEstado()));
    }
}
