import React from 'react'
import { SAMPLE_EVENTS } from '../../models/Product'
import EventCard from './EventCard'


function EventsList() {
  return (
    <div>
        <h1 className='text-center my-3'>Events List</h1>
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {SAMPLE_EVENTS.map(event => <EventCard key={event.title} event={event} />)}
          </div>
        </div>
    </div>
  )
}

export default EventsList