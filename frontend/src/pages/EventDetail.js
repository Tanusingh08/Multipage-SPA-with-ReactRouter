import { Suspense } from 'react';
import { json,useRouteLoaderData,redirect,defer,Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');
  return (
    <>
    <Suspense fallback={<p style = {{textAlign : 'center'}}>Loading...</p>}>
    <Await resolve={event}>
      {(loadedData) => (<EventItem event = {loadedData}/>)}
    </Await>
    </Suspense>

    <Suspense fallback={<p style = {{textAlign : 'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {(loadedData) => (<EventsList events = {loadedData}/>)}
    </Await>
    </Suspense>
     
    </>
  );
}

export default EventDetailPage;

export async function loadEvent(id){
  const response  = await fetch("http://localhost:8080/events/" + id);
  // const response = await data.json();

  if(!response.ok){
    throw json({message: 'Could not fetch the data'},{status:500});
  }else{
    const resData = await response.json();
    return resData.event;
  }
}

export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError : true, message : 'Could not fetch data'}
    // throw new Error("Could not fetch events");
    // throw { message: 'Could not fetch data'}

    // throw new Response(JSON.stringify({message:'Could not fetch data'}),{
    //   status:500,
    // })

    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({request, params}){
    const id = params.eventId;
    return defer({
      event : await loadEvent(id),
      events : loadEvents()
    })
}

export async function action({request,params}){
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id,{
    method : request.method
  });
  if(!response.ok){
    throw json({message: 'Could not delete the event'}, {status:500});
  }

  return redirect('/events');
}