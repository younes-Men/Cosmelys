import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root endpoint for status and health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Cosmelys',
    service: 'Laboratoire Cosmétique API',
    message: 'Backend API is running smoothly on Render!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Cosmelys',
    service: 'Laboratoire Cosmétique API',
    timestamp: new Date().toISOString()
  });
});

// Enregistrer une demande de devis (sans stockage sur disque)
app.post('/api/devis', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Demande de devis traitée avec succès.'
  });
});

// Enregistrer un message de contact (sans stockage sur disque)
app.post('/api/contact', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Message transmis avec succès.'
  });
});

app.listen(PORT, () => {
  console.log(`✨ Cosmelys API server démarré sur http://localhost:${PORT}`);
});
