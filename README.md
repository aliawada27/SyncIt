# SyncIt

## Description

SyncIt est une plateforme collaborative en cours de développement pour organiser des événements en temps réel. L'application permet aux utilisateurs de planifier, coordonner et gérer des événements collaboratifs avec des fonctionnalités de gestion de tâches, de chat en temps réel et de notifications.

## Statut du projet

**Application en cours de développement**

Cette application est actuellement en phase de développement active. Les fonctionnalités peuvent être incomplètes ou sujettes à des modifications importantes.

## Fonctionnalités actuelles

### Version Demo (v1.0.0)
- Interface web responsive avec design moderne
- Gestion d'événements (création, affichage, détails)
- Système de tâches collaboratives
- API REST fonctionnelle
- Interface utilisateur intuitive

### Fonctionnalités prévues
- Authentification utilisateurs (OAuth Google/Facebook)
- Chat en temps réel avec Socket.IO
- Notifications push
- Application mobile React Native
- Intégration calendrier Google
- Tableaux Kanban pour les tâches
- Système d'invitations et QR codes

## Architecture technique

### Technologies utilisées
- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript ES6
- **Backend**: Node.js, Express.js
- **API**: REST avec routes CRUD
- **Base de données**: En mémoire (pour la demo)

### Architecture prévue
- **Frontend Web**: Next.js, React, TypeScript, Tailwind CSS
- **Mobile**: React Native avec Expo
- **Backend**: Node.js, Express, Socket.IO, GraphQL
- **Base de données**: PostgreSQL avec Prisma ORM
- **Cache**: Redis
- **Services externes**: Firebase (notifications), Cloudinary (stockage)

## Installation et lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
git clone https://github.com/aliawada27/SyncIt.git
cd SyncIt
npm install
```

### Lancement de l'application
```bash
npm start
# ou
node server.js
```

L'application sera accessible à l'adresse : http://localhost:3000

### API Endpoints disponibles
- `GET /api/health` - Vérification du statut de l'API
- `GET /api/events` - Liste des événements
- `GET /api/events/:id` - Détails d'un événement
- `POST /api/events` - Création d'un nouvel événement
- `POST /api/tasks` - Création d'une tâche

## Structure du projet

```
SyncIt/
├── public/                 # Fichiers statiques (HTML, CSS, JS)
│   ├── index.html         # Page d'accueil
│   ├── events.html        # Liste des événements
│   └── event-details.html # Détails d'un événement
├── server.js              # Serveur Express principal
├── package.json           # Dépendances et scripts
└── README.md             # Documentation
```

## Contribution

Ce projet est en cours de développement. Les contributions ne sont pas encore acceptées car l'architecture est en phase de définition.

## Roadmap de développement

### Phase 1 (Actuelle - Demo)
- [x] Interface web de base
- [x] API REST simple
- [x] Gestion d'événements basique

### Phase 2 (En cours)
- [ ] Architecture monorepo complète
- [ ] Base de données PostgreSQL
- [ ] Authentification utilisateurs
- [ ] Tests unitaires et d'intégration

### Phase 3 (Planifiée)
- [ ] Chat temps réel
- [ ] Application mobile
- [ ] Notifications push
- [ ] Intégrations externes

### Phase 4 (Future)
- [ ] Déploiement en production
- [ ] Monitoring et analytics
- [ ] Optimisations performance

## Licence

Ce projet est actuellement privé et en cours de développement.

## Contact

Pour toute question concernant le projet, veuillez contacter l'équipe de développement.

---

**Note**: Cette application est en développement actif. Les fonctionnalités, l'architecture et la documentation peuvent changer fréquemment. 