#!/bin/bash

# =============================================================================
# SYNCIT - SCRIPT DE CONFIGURATION RAPIDE
# =============================================================================

set -e

echo "🚀 Configuration de SyncIt..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# VÉRIFICATION DES PRÉREQUIS
# =============================================================================

print_status "Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ requis. Version actuelle: $(node --version)"
    exit 1
fi

print_success "Node.js $(node --version) détecté"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "npm $(npm --version) détecté"

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    print_warning "Docker n'est pas installé. Certaines fonctionnalités ne seront pas disponibles."
else
    print_success "Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) détecté"
fi

# Vérifier Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose n'est pas installé. Certaines fonctionnalités ne seront pas disponibles."
else
    print_success "Docker Compose $(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1) détecté"
fi

# =============================================================================
# INSTALLATION DES DÉPENDANCES
# =============================================================================

print_status "Installation des dépendances..."

# Installation des dépendances racines
print_status "Installation des dépendances racines..."
npm install

print_success "Dépendances installées avec succès"

# =============================================================================
# CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
# =============================================================================

print_status "Configuration des variables d'environnement..."

if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        print_success "Fichier .env créé depuis env.example"
        print_warning "Veuillez éditer le fichier .env avec vos propres valeurs"
    else
        print_error "Fichier env.example introuvable"
    fi
else
    print_warning "Le fichier .env existe déjà"
fi

# =============================================================================
# CONFIGURATION DE LA BASE DE DONNÉES
# =============================================================================

print_status "Configuration de la base de données..."

if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    print_status "Démarrage des services de base de données avec Docker..."
    
    # Créer les répertoires de données
    mkdir -p postgres-data redis-data
    
    # Démarrer PostgreSQL et Redis
    docker-compose -f docker-compose.dev.yml up -d postgres redis
    
    # Attendre que les services soient prêts
    print_status "Attente du démarrage des services..."
    sleep 10
    
    # Générer le client Prisma
    print_status "Génération du client Prisma..."
    npm run prisma:generate --workspace=apps/backend
    
    # Exécuter les migrations
    print_status "Exécution des migrations de base de données..."
    npm run prisma:migrate --workspace=apps/backend
    
    print_success "Base de données configurée avec succès"
else
    print_warning "Docker non disponible. Veuillez configurer manuellement PostgreSQL et Redis"
    print_warning "Puis exécuter: npm run prisma:generate --workspace=apps/backend"
    print_warning "Et: npm run prisma:migrate --workspace=apps/backend"
fi

# =============================================================================
# CONFIGURATION DU FRONTEND
# =============================================================================

print_status "Configuration du frontend..."

# Vérifier si Expo CLI est installé pour le mobile
if ! command -v expo &> /dev/null; then
    print_warning "Expo CLI n'est pas installé. Pour l'app mobile, installez-le avec:"
    print_warning "npm install -g @expo/cli"
fi

# =============================================================================
# TESTS
# =============================================================================

print_status "Exécution des tests de vérification..."

# Test du backend
print_status "Test du backend..."
if npm run typecheck --workspace=apps/backend; then
    print_success "Backend: TypeScript OK"
else
    print_warning "Backend: Problèmes TypeScript détectés"
fi

# Test du frontend web
print_status "Test du frontend web..."
if npm run typecheck --workspace=apps/web; then
    print_success "Frontend Web: TypeScript OK"
else
    print_warning "Frontend Web: Problèmes TypeScript détectés"
fi

# =============================================================================
# RÉSUMÉ ET PROCHAINES ÉTAPES
# =============================================================================

echo ""
echo "🎉 Configuration terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo ""
echo "1. Configurez vos variables d'environnement dans le fichier .env"
echo "   - Clés OAuth (Google, Facebook)"
echo "   - Clés Firebase pour les notifications"
echo "   - Clés API externes (Cloudinary, etc.)"
echo ""
echo "2. Démarrez l'application en mode développement:"
echo "   npm run dev                    # Démarre tous les services"
echo "   npm run dev:backend           # Backend seulement"
echo "   npm run dev:web               # Frontend web seulement"
echo "   npm run dev:mobile            # App mobile seulement"
echo ""
echo "3. Ou utilisez Docker:"
echo "   npm run docker:dev            # Tous les services avec Docker"
echo ""
echo "4. Accédez aux services:"
echo "   - Frontend Web:     http://localhost:3000"
echo "   - API Backend:      http://localhost:5000"
echo "   - GraphQL:          http://localhost:5000/graphql"
echo "   - App Mobile:       Expo Go + QR Code"
echo "   - Adminer (DB):     http://localhost:8080"
echo "   - Redis Insight:    http://localhost:8001"
echo ""
echo "5. Documentation:"
echo "   - README.md pour les détails"
echo "   - apps/backend/docs/ pour l'API"
echo "   - packages/shared/src/ pour les types"
echo ""
echo "🔧 Commandes utiles:"
echo "   npm run lint              # Vérifier le code"
echo "   npm run test              # Exécuter les tests"
echo "   npm run build             # Construire pour la production"
echo "   npm run prisma:studio     # Interface de gestion de la DB"
echo ""
print_success "SyncIt est prêt à être utilisé! 🚀" 