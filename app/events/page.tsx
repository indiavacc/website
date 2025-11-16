"use client";
import Divider from "@/components/Divider";
import { useEventsStore } from "@/app/store/useEventsStore";
import useEvents from "../hooks/useEvents";
import { EventCard } from "./Components/EventCard";

const EventsPage = () => {
  useEvents();
  const { events } = useEventsStore();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <Divider title="All Events" />
        {!events?.length ? (
          <span className="mt-2 px-3 py-1 text-md font-semibold rounded-md  backdrop-blur-md text-white">
            No Events available.
          </span>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                image={event.banner?.url || ""}
                title={event.name}
                chipLabel={event.type}
                description={event.description}
                from={event.from}
                to={event.to}
                ctaText="Join Event"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
