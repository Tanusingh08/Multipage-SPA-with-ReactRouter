import { useEffect, useState, Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>isLoading</p>}>
      <Await resolve={events}>
        {(loaderData) => <EventsList events={loaderData} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
