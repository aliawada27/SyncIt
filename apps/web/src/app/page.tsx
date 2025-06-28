import Link from 'next/link'
import { CalendarIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, BellIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">SyncIt</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/events" className="text-gray-600 hover:text-primary-600 transition-colors">
                Événements
              </Link>
              <Link href="/tasks" className="text-gray-600 hover:text-primary-600 transition-colors">
                Tâches
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-primary-600 transition-colors">
                Chat
              </Link>
              <Link href="/auth" className="btn-primary">
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Organisez vos événements
            <span className="text-gradient block">en toute simplicité</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            SyncIt vous aide à planifier, coordonner et réussir vos événements collaboratifs 
            grâce aux tâches partagées, au chat en temps réel et aux notifications intelligentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" className="btn-primary text-lg px-8 py-3">
              Commencer maintenant
            </Link>
            <Link href="/demo" className="btn-secondary text-lg px-8 py-3">
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600">
              Une plateforme complète pour vos événements collaboratifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestion d'événements</h3>
              <p className="text-gray-600">
                Créez, planifiez et gérez vos événements avec invitations et calendrier intégré.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tâches collaboratives</h3>
              <p className="text-gray-600">
                Organisez le travail avec des tableaux Kanban et assignez des tâches à votre équipe.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat temps réel</h3>
              <p className="text-gray-600">
                Communiquez instantanément avec votre équipe grâce au chat en temps réel.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notifications</h3>
              <p className="text-gray-600">
                Restez informé avec les notifications push sur mobile et desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à transformer vos événements ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez des milliers d'organisateurs qui font confiance à SyncIt
          </p>
          <Link href="/events" className="bg-white text-primary-600 hover:bg-gray-100 btn text-lg px-8 py-3">
            Commencer gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SyncIt</h3>
              <p className="text-gray-400">
                La plateforme collaborative pour organiser vos événements en toute simplicité.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/demo" className="hover:text-white">Démo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Centre d'aide</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Statut</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">À propos</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Carrières</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SyncIt. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 