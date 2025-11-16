import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/api";
import { isSameDay } from "@/lib/utils";

interface EventCardProps {
  image: string;
  title: string;
  chipLabel?: string;
  description: string;
  from: Date;
  to: Date;
  emoji?: string;
  ctaText?: string;
  onClick?: () => void;
}

const getTimeText = (from: Date, to: Date) => {
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

export const EventCard = ({
  image,
  title,
  chipLabel,
  description,
  from,
  to,
  emoji = "🛫",
  ctaText = "Learn More",
  onClick,
}: EventCardProps) => {
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
          style={{ backgroundImage: `url(${BASE_URL}${image})` }}
        />
        {/* Gradient that fades to black on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black" />
      </div>

      {/* Right Content Section */}
      <div className="relative flex flex-col justify-center md:w-1/2 p-6 md:p-8 bg-black">
        {/* Title + Chip */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-semibold text-white tracking-wide">
            {title}
          </h2>
          {chipLabel && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full">
              {chipLabel}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-zinc-400 mb-8 text-sm md:text-base leading-relaxed">
          {description}
        </p>

        {/* Bottom Row: Date/Time + CTA */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <span className="text-lg">{emoji}</span>
            <span>{getTimeText(from, to)}</span>
          </div>

          <Button
            onClick={onClick}
            className="bg-gradient-to-r from-orange-600 to-amber-500 text-black font-medium rounded-full px-6 py-2 hover:shadow-[0_0_15px_2px_rgba(255,165,0,0.4)] transition-all"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
