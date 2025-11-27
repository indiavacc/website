// --------------------
// Flight Plan
// --------------------
interface FlightPlan {
  flight_rules: string;
  aircraft: string;
  aircraft_faa: string;
  aircraft_short: string;
  departure: string;
  arrival: string;
  alternate?: string;
  cruise_tas?: string;
  altitude?: string;
  deptime?: string;
  enroute_time?: string;
  fuel_time?: string;
  remarks?: string;
  route?: string;
  revision_id?: number;
  assigned_transponder?: string;
}

// --------------------
// Pilot
// --------------------
interface Pilot {
  cid: number;
  name: string;
  callsign: string;
  server: string;
  pilot_rating: PilotRating;
  military_rating: MilitaryRating;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  groundspeed?: number;
  transponder?: string;
  heading?: number;
  qnh_i_hg?: number;
  qnh_mb?: number;
  flight_plan?: FlightPlan;
  logon_time: string | Date;
  last_updated: string | Date;
}

// --------------------
// ATIS
// --------------------
interface ATIS {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: ControllerRating;
  server: string;
  visual_range?: number;
  atis_code?: string;
  text_atis: string[];
  last_updated: string | Date;
  logon_time: string | Date;
}

// --------------------
// Controller
// --------------------
interface Controller {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: ControllerRating;
  server: string;
  visual_range?: number;
  text_atis?: string[] | null;
  last_updated: string | Date;
  logon_time: string | Date;
}

// --------------------
// Facility
// --------------------
interface Facility {
  id: number;
  short: string;
  long: string;
}

// --------------------
// General Info
// --------------------
interface GeneralInfo {
  version: number;
  reload: number;
  update: string;
  update_timestamp: string | Date;
  connected_clients: number;
  unique_users: number;
}

// --------------------
// Prefile (upcoming flights)
// --------------------
interface Prefile {
  cid: number;
  name: string;
  callsign: string;
  flight_plan: FlightPlan;
  last_updated: string | Date;
}

// --------------------
// Server Info
// --------------------
interface Server {
  ident: string;
  hostname_or_ip: string;
  location: string;
  name: string;
  clients_connection_allowed: number;
  client_connections_allowed: boolean;
  is_sweatbox: boolean;
}

// --------------------
// Full Live Data Response
// --------------------
interface LiveData {
  atis: ATIS[];
  controllers: Controller[];
  facilities: Facility[];
  general: GeneralInfo;
  military_ratings: MilitaryRatingInfo[];
  pilot_ratings: PilotRatingInfo[];
  pilots: Pilot[];
  prefiles: Prefile[];
  ratings: ControllerRatingInfo[];
  servers: Server[];
}

// --------------------
// Rating Info (metadata)
// --------------------
interface PilotRatingInfo {
  id: number;
  short_name: string;
  long_name: string;
}

interface MilitaryRatingInfo {
  id: number;
  short_name: string;
  long_name: string;
}

interface ControllerRatingInfo {
  id: number;
  short: string;
  long: string;
}
