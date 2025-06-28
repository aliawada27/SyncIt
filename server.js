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
const events = [
  {
    id: '1',
    title: 'Conférence Tech 2024',
    description: 'Grande conférence sur les nouvelles technologies',
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 172800000).toISOString(),
    status: 'active',
    participantsCount: 150,
    inviteCode: 'TECH2024',
    participants: [
      { id: '1', name: 'Alice Martin', role: 'organizer' },
      { id: '2', name: 'Bob Dupont', role: 'participant' }
    ],
    tasks: [
      { id: '1', title: 'Réserver la salle', status: 'done' },
      { id: '2', title: 'Contacter les speakers', status: 'in_progress' }
    ]
  },
  {
    id: '2',
    title: 'Workshop Design UX',
    description: 'Atelier sur le design UX',
    startDate: new Date(Date.now() + 259200000).toISOString(),
    endDate: new Date(Date.now() + 273600000).toISOString(),
    status: 'active',
    participantsCount: 25,
    inviteCode: 'UX2024',
    participants: [
      { id: '3', name: 'Marie Leroy', role: 'organizer' }
    ],
    tasks: [
      { id: '3', title: 'Préparer les exercices', status: 'todo' }
    ]
  }
];

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', mode: 'demo' });
});

app.get('/api/events', (req, res) => {
  res.json({ success: true, data: events });
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    id: Date.now().toString(),
    ...req.body,
    status: 'active',
    participantsCount: 1,
    participants: [{ id: 'demo', name: 'Demo User', role: 'organizer' }],
    tasks: []
  };
  events.push(newEvent);
  res.status(201).json({ success: true, data: newEvent });
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    status: 'todo'
  };
  res.status(201).json({ success: true, data: newTask });
});

// Routes pour servir les pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'events.html'));
});

app.get('/events/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'event-details.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 SyncIt Demo running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Events: http://localhost:${PORT}/events`);
}); 