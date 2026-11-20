import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*', // Permet les requêtes depuis Vercel, localhost, et tout domaine
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
    endpoints: {
      health: '/api/health',
      devis: '/api/devis',
      contact: '/api/contact'
    },
    timestamp: new Date().toISOString()
  });
});

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const devisFilePath = path.join(dataDir, 'devis.json');
const messagesFilePath = path.join(dataDir, 'messages.json');

// Helper to read JSON safely
const readJsonFile = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
};

// Helper to write JSON safely
const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// --- ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Cosmelys',
    service: 'Laboratoire Cosmétique API',
    timestamp: new Date().toISOString()
  });
});

// Enregistrer une demande de devis
app.post('/api/devis', (req, res) => {
  try {
    const { client, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Veuillez sélectionner au moins un produit pour le devis.' });
    }

    const devisList = readJsonFile(devisFilePath, []);

    const newDevis = {
      id: `DEV-${Date.now().toString(36).toUpperCase()}`,
      client: {
        nom: client?.nom || 'Non spécifié',
        prenom: client?.prenom || '',
        telephone: client?.telephone || '',
        email: client?.email || '',
        nomMarque: client?.nomMarque || 'Non spécifiée'
      },
      items: items.map(item => ({
        gammeId: item.gammeId,
        gammeName: item.gammeName,
        productId: item.productId,
        productName: item.productName,
        quantite: item.quantite || '100',
        notes: item.notes || ''
      })),
      createdAt: new Date().toISOString(),
      status: 'en_attente'
    };

    devisList.unshift(newDevis);
    writeJsonFile(devisFilePath, devisList);

    console.log(`[Cosmelys] Nouveau devis enregistré: ${newDevis.id} par ${newDevis.client.prenom} ${newDevis.client.nom}`);

    res.status(201).json({
      success: true,
      message: 'Demande de devis enregistrée avec succès.',
      devisId: newDevis.id,
      devis: newDevis
    });
  } catch (error) {
    console.error('Erreur devis:', error);
    res.status(500).json({ error: 'Erreur lors du traitement de la demande de devis.' });
  }
});

// Récupérer les demandes de devis
app.get('/api/devis', (req, res) => {
  const devisList = readJsonFile(devisFilePath, []);
  res.json({
    total: devisList.length,
    devis: devisList
  });
});

// Enregistrer un message de contact
app.post('/api/contact', (req, res) => {
  try {
    const { nom, prenom, telephone, sujet, message } = req.body;

    if (!nom || !sujet || !message) {
      return res.status(400).json({ error: 'Champs obligatoires manquants (nom, sujet, message).' });
    }

    const messagesList = readJsonFile(messagesFilePath, []);

    const newMessage = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      nom,
      prenom: prenom || '',
      telephone: telephone || '',
      sujet,
      message,
      createdAt: new Date().toISOString(),
      status: 'non_lu'
    };

    messagesList.unshift(newMessage);
    writeJsonFile(messagesFilePath, messagesList);

    console.log(`[Cosmelys] Nouveau message reçu de ${prenom} ${nom} - Sujet: ${sujet}`);

    res.status(201).json({
      success: true,
      message: 'Votre message a été transmis avec succès.',
      messageId: newMessage.id
    });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({ error: 'Erreur lors de la transmission du message.' });
  }
});

// Récupérer les messages reçus
app.get('/api/contact', (req, res) => {
  const messagesList = readJsonFile(messagesFilePath, []);
  res.json({
    total: messagesList.length,
    messages: messagesList
  });
});

app.listen(PORT, () => {
  console.log(`✨ Cosmelys API server démarré sur http://localhost:${PORT}`);
});
