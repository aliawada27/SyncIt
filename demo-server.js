// =============================================================================
// SYNCIT DEMO SERVER - VERSION SIMPLE
// =============================================================================

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Données de démonstration
const demoEvents = [
  {
    id: '1',
    title: 'Conférence Tech 2024',
    description: 'Grande conférence sur les nouvelles technologies et l\'innovation',
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 172800000).toISOString(),
    status: 'active',
    participantsCount: 150,
    inviteCode: 'TECH2024',
    participants: [
      { id: '1', name: 'Alice Martin', role: 'organizer' },
      { id: '2', name: 'Bob Dupont', role: 'participant' },
      { id: '3', name: 'Claire Dubois', role: 'participant' }
    ],
    tasks: [
      { id: '1', title: 'Réserver la salle', status: 'done' },
      { id: '2', title: 'Contacter les speakers', status: 'in_progress' },
      { id: '3', title: 'Préparer le matériel', status: 'todo' }
    ]
  },
  {
    id: '2',
    title: 'Workshop Design UX',
    description: 'Atelier pratique sur le design d\'expérience utilisateur',
    startDate: new Date(Date.now() + 259200000).toISOString(),
    endDate: new Date(Date.now() + 273600000).toISOString(),
    status: 'active',
    participantsCount: 25,
    inviteCode: 'UX2024',
    participants: [
      { id: '4', name: 'Marie Leroy', role: 'organizer' },
      { id: '5', name: 'Paul Bernard', role: 'participant' }
    ],
    tasks: [
      { id: '4', title: 'Préparer les exercices', status: 'in_progress' },
      { id: '5', title: 'Créer les supports', status: 'todo' }
    ]
  }
];

const demoTasks = [
  {
    id: '1',
    title: 'Préparer la présentation',
    description: 'Créer les slides pour la demo',
    status: 'todo',
    priority: 'high',
    eventId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Réserver la salle',
    description: 'Contacter le service réservation',
    status: 'in_progress',
    priority: 'medium',
    eventId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Préparer le matériel',
    description: 'Vérifier projecteur et micros',
    status: 'done',
    priority: 'low',
    eventId: '1',
    createdAt: new Date().toISOString()
  }
];

// Routes API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0-demo',
    mode: 'demo'
  });
});

app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    data: demoEvents,
    meta: {
      total: demoEvents.length,
      page: 1,
      limit: 20
    }
  });
});

app.get('/api/events/:id', (req, res) => {
  const event = demoEvents.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

app.get('/api/tasks', (req, res) => {
  const { eventId } = req.query;
  let tasks = demoTasks;
  if (eventId) {
    tasks = demoTasks.filter(t => t.eventId === eventId);
  }
  res.json({ success: true, data: tasks });
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'active',
    participantsCount: 1,
    participants: [{ id: 'demo-user', name: 'Demo User', role: 'organizer' }],
    tasks: []
  };
  demoEvents.push(newEvent);
  
  res.status(201).json({
    success: true,
    data: newEvent,
    message: 'Event created successfully'
  });
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    status: 'todo',
    createdAt: new Date().toISOString()
  };
  demoTasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask,
    message: 'Task created successfully'
  });
});

// Route pour servir l'app frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'events.html'));
});

app.get('/events/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'event-details.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 SyncIt Demo Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Events: http://localhost:${PORT}/events`);
  console.log(`🎯 Ready to demo!`);
}); 