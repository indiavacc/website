interface Organiser {
  region: string;
  division: string;
  subdivision: string | null;
  organised_by_vatsim: boolean;
}

interface Airport {
  icao: string;
}

interface Route {
  departure: string;
  arrival: string;
  route: string;
}

interface Event {
  id: number;
  type: string;
  name: string;
  link: string;
  organisers: Organiser[];
  airports: Airport[];
  routes: Route[];
  start_time: string;
  end_time: string;
  short_description: string;
  description: string;
  banner: string;
}

interface EventResponse {
  data: Event[];
}
