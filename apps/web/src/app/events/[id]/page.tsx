'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  CalendarIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon, 
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

interface EventDetails {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  inviteCode: string
  participants: Array<{ id: string; name: string; role: string }>
  tasks: Array<{ id: string; title: string; status: string }>
}

export default function EventDetailsPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<EventDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`)
        const data = await response.json()
        if (data.success) {
          setEvent(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'événement:', error)
        // Données de démonstration
        setEvent({
          id: eventId,
          title: 'Conférence Tech 2024',
          description: 'Une grande conférence sur les nouvelles technologies et l\'innovation. Rejoignez-nous pour découvrir les dernières tendances et networker avec des professionnels du secteur.',
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 172800000).toISOString(),
          status: 'active',
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
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'done': return 'Terminé'
      case 'in_progress': return 'En cours'
      default: return 'À faire'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Événement non trouvé</h2>
          <p className="text-gray-600 mb-4">L'événement que vous recherchez n'existe pas.</p>
          <Link href="/events" className="btn-primary">
            Retour aux événements
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <Link href="/events" className="text-primary-600 hover:text-primary-700 font-medium">
                ← Retour aux événements
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{event.title}</h1>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
            <button className="btn-primary flex items-center">
              <ShareIcon className="w-5 h-5 mr-2" />
              Partager
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de base */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">Début: {formatDate(event.startDate)}</p>
                    <p className="text-gray-600">Fin: {formatDate(event.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <p>{event.participants.length} participants</p>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 text-gray-400 mr-3 text-sm">#</span>
                  <p>Code d'invitation: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{event.inviteCode}</span></p>
                </div>
              </div>
            </div>

            {/* Tâches */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tâches</h2>
                <Link href={`/events/${event.id}/tasks`} className="btn-secondary text-sm">
                  <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
                  Voir toutes les tâches
                </Link>
              </div>
              <div className="space-y-3">
                {event.tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircleIcon className={`w-5 h-5 mr-3 ${
                        task.status === 'done' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className={task.status === 'done' ? 'line-through text-gray-500' : ''}>
                        {task.title}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTaskStatusColor(task.status)}`}>
                      {getTaskStatusText(task.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link href={`/events/${event.id}/chat`} 
                      className="w-full btn-primary flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Ouvrir le chat
                </Link>
                <Link href={`/events/${event.id}/tasks`} 
                      className="w-full btn-secondary flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                  Gérer les tâches
                </Link>
                <button className="w-full btn-secondary flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  Inviter des participants
                </button>
              </div>
            </div>

            {/* Participants */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
              <div className="space-y-3">
                {event.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-600 font-medium text-sm">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{participant.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      participant.role === 'organizer' 
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {participant.role === 'organizer' ? 'Organisateur' : 'Participant'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 