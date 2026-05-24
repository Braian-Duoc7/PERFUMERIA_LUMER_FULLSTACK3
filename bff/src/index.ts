import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// JWT Validation Middleware (stub)
const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Stub validation - en producción validar token real
  if (token) {
    try {
      // TODO: Implementar validación real de JWT con librería jsonwebtoken
      console.log('JWT token presente:', token.substring(0, 10) + '...');
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    // Sin token - permitir acceso (stub)
    console.log('Sin token JWT');
    next();
  }
};

const MS_PRODUCTOS_URL = process.env.MS_PRODUCTOS_URL || 'http://localhost:8001';
const MS_ORDENES_URL = process.env.MS_ORDENES_URL || 'http://localhost:8002';

// Ruta: Obtener productos del microservicio
app.get('/api/productos', validateJWT, async (req, res) => {
  try {
    const response = await axios.get(`${MS_PRODUCTOS_URL}/api/productos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching productos' });
  }
});

// Ruta: Obtener producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const response = await axios.get(`${MS_PRODUCTOS_URL}/api/productos/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta: Crear orden en el microservicio de órdenes
app.post('/api/ordenes', validateJWT, async (req, res) => {
  try {
    const response = await axios.post(`${MS_ORDENES_URL}/api/ordenes`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creando orden' });
  }
});

// Ruta: Obtener órdenes del usuario
app.get('/api/ordenes', async (req, res) => {
  try {
    const response = await axios.get(`${MS_ORDENES_URL}/api/ordenes`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching órdenes' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'bff' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`);
});
