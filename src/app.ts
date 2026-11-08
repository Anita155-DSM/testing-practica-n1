import express from 'express';
import { calcularPromedio, estaAprobado } from './services/notas.ts';

export const app = express();
app.use(express.json());

app.get('/healthy', (_req, res) => {
  res.json({ estado: 'ok' });
});

// Recibe { "notas": [7, 8, 9] } y responde { "promedio": 8, "aprobado": true }
app.post('/api/notas/evaluar', (req, res) => {
  const { notas } = req.body ?? {};

  if (!Array.isArray(notas)) {
    res.status(400).json({ error: 'Se esperaba un arreglo de notas' });
    return;
  }

  try {
    const promedio = calcularPromedio(notas);
    const aprobado = estaAprobado(promedio);
    res.status(200).json({ promedio, aprobado });
  } catch (error) {
    if (error instanceof RangeError) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Error interno' });
  }
});
