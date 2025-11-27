import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isSameDay } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const getTimeText = (from: Date | string, to: Date | string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const sameDay = isSameDay(fromDate, toDate);

  const baseOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    ...baseOptions,
  };

  if (sameDay) {
    // Same day: only show time for 'to'
    return `${fromDate.toLocaleString(
      undefined,
      options
    )} - ${toDate.toLocaleString(undefined, baseOptions)}`;
  } else {
    // Different day: show full date and time for both
    return `${fromDate.toLocaleString(
      undefined,
      options
    )} - ${toDate.toLocaleString(undefined, options)}`;
  }
};

export const EventCard = ({ event }: EventCardProps) => {
  const onClick = () => {
    window.open(event.link, "_blank");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-black"
    >
      {/* Left Image Section */}
      <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.banner})` }}
        />
        {/* Gradient that fades to black on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black" />

        {/* Pin + Airport text with black fading background */}
        <div className="absolute top-3 left-3 flex  items-center gap-2">
          <div className="bg-black/70 text-white text-xs font-semibold space-x-2 px-2 py-0.5 rounded-3xl">
            <span>📍</span>
            <span>
              {event.airports.map((a, i) => (
                <span key={a.icao}>
                  {a.icao}
                  {i < event.airports.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="relative flex flex-col justify-center md:w-1/2 p-6 md:p-8 bg-black">
        {/* Title + Chip */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-white tracking-wide">
            {event.name}
          </h2>
          {event.type && (
            <Badge className="relative px-3 py-1 rounded-full text-black font-medium overflow-hidden border-0 bg-transparent">
              <span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                style={{ zIndex: 0 }}
              />
              <span className="relative z-10">{event.type}</span>
            </Badge>
          )}
        </div>

        {/* Description trimmed to 2 lines */}
        <p className="text-zinc-400 mb-8 text-sm md:text-base leading-relaxed line-clamp-2 overflow-hidden">
          {event.description}
        </p>

        {/* Bottom Row: Date/Time + CTA */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <span className="text-lg">{"🛫"}</span>
            <span>{getTimeText(event.start_time, event.end_time)}</span>
          </div>

          <Button
            onClick={onClick}
            className="bg-gradient-to-r from-orange-600 to-amber-500 text-black font-medium rounded-full px-6 py-2 hover:shadow-[0_0_15px_2px_rgba(255,165,0,0.4)] transition-all"
          >
            {"View Event"}
          </Button>
        </div>
      </div>
    </motion.div>

    // <motion.div
    //   initial={{ opacity: 0, y: 30 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6, ease: "easeOut" }}
    //   className="relative flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-black"
    // >
    //   {/* Left Image Section */}
    //   <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
    //     {/* Background Image */}
    //     <div
    //       className="absolute inset-0 bg-cover bg-center"
    //       style={{ backgroundImage: `url(${event.banner})` }}
    //     />
    //     {/* Gradient that fades to black on right */}
    //     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black" />
    //   </div>

    //   {/* Right Content Section */}
    //   <div className="relative flex flex-col justify-center md:w-1/2 p-6 md:p-8 bg-black">
    //     {/* Title + Chip */}
    //     <div className="flex items-center gap-3 mb-2">
    //       <h2 className="text-3xl font-semibold text-white tracking-wide">
    //         {event.name}
    //       </h2>
    //       {event.type && (
    //         <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full">
    //           {event.type}
    //         </Badge>
    //       )}
    //     </div>

    //     {/* Description */}
    //     <p className="text-zinc-400 mb-8 text-sm md:text-base leading-relaxed">
    //       {event.description}
    //     </p>

    //     {/* Bottom Row: Date/Time + CTA */}
    //     <div className="flex justify-between items-center mt-auto">
    //       <div className="flex items-center gap-2 text-zinc-400 text-sm">
    //         <span className="text-lg">{"🛫"}</span>
    //         <span>{getTimeText(event.start_time, event.end_time)}</span>
    //       </div>

    //       <Button
    //         onClick={onClick}
    //         className="bg-gradient-to-r from-orange-600 to-amber-500 text-black font-medium rounded-full px-6 py-2 hover:shadow-[0_0_15px_2px_rgba(255,165,0,0.4)] transition-all"
    //       >
    //         {"View Event"}
    //       </Button>
    //     </div>
    //   </div>
    // </motion.div>
  );
};
