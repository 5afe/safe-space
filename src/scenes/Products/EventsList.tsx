import React from 'react'
import { ProductCollection } from '../../models/Product'
import EventCard from './EventCard'

function EventsList() {

  const events: ProductCollection[] = [
    {
      title: 'Taylor Swift Concert - Austin - March 15, 2023',
      image: '',
    },
    {
      title: 'Blue Mountain Skiing Day Pass - January 20, 2023',
      image: '',
    },
    {
      title: 'Blue Mountain Skiing Day Pass - January 21, 2023',
      image: '',
    },
    {
      title: 'Blue Mountain Skiing Day Pass - January 22, 2023',
      image: '',
    },
  ]
  return (
    <div>
        <h1>EventsList</h1>
        <div className="album py-5 bg-light">
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {events.map(event => <EventCard key={event.title} event={event} />)}
      </div>
    </div>
  </div>
    </div>
  )
}

export default EventsList