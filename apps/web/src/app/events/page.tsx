'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline'

interface Event {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  participantsCount: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events')
        const data = await response.json()
        if (data.success) {
          setEvents(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error)
        // Données de démonstration en cas d'erreur
        setEvents([
          {
            id: '1',
            title: 'Conférence Tech 2024',
            description: 'Grande conférence sur les nouvelles technologies',
            startDate: new Date(Date.now() + 86400000).toISOString(),
            endDate: new Date(Date.now() + 172800000).toISOString(),
            status: 'active',
            participantsCount: 150
          },
          {
            id: '2',
            title: 'Workshop Design UX',
            description: 'Atelier pratique sur le design d\'expérience utilisateur',
            startDate: new Date(Date.now() + 259200000).toISOString(),
            endDate: new Date(Date.now() + 273600000).toISOString(),
            status: 'active',
            participantsCount: 25
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                ← Retour à l'accueil
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Mes événements</h1>
            </div>
            <button className="btn-primary flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Nouvel événement
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement</h3>
            <p className="text-gray-600 mb-6">Commencez par créer votre premier événement</p>
            <button className="btn-primary">
              <PlusIcon className="w-5 h-5 mr-2" />
              Créer un événement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="card hover:shadow-xl transition-shadow cursor-pointer">
                <Link href={`/events/${event.id}`}>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status === 'active' ? 'Actif' : 'Brouillon'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(event.startDate)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="w-4 h-4 mr-2" />
                        {event.participantsCount} participants
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-primary-600 font-medium">Voir les détails →</span>
                        <div className="flex space-x-2">
                          <Link href={`/events/${event.id}/tasks`} 
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Tâches
                          </Link>
                          <Link href={`/events/${event.id}/chat`} 
                                className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            Chat
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 