import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { SAMPLE_EVENTS } from '../../models/Product';
import { TextUtils } from '../../utils/TextUtils';
import EventCard from './EventCard'

function EventDetail() {
  const {eventId} = useParams();
  const event = SAMPLE_EVENTS.find(value=> value.slug===eventId)!;

  return (
    <div>
        <h1 className='text-center my-3'>
                {event.title}
        </h1>
        <div className="container">
          
        <div className="card shadow-sm">

          <img src={event.image} width={300} />
          

          <div className="card-body">
            <p className="card-text">
              {event.description}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">Available Tickets: 10</small>
            </div>
            <button className='btn btn-primary m-3'>
              Buy NFT
            </button>
          </div>

        </div>
        </div>
    </div>
  )
}

export default EventDetail