// --------------------
// Enums
// --------------------

// Pilot Ratings
export enum PilotRating {
  NEW = 0, // Basic Member
  PPL = 1, // Private Pilot License
  IR = 3, // Instrument Rating
  CMEL = 7, // Commercial Multi-Engine License
  ATPL = 15, // Airline Transport Pilot License
  FI = 31, // Flight Instructor
  FE = 63, // Flight Examiner
}

// Military Ratings
export enum MilitaryRating {
  M0 = 0, // No Military Rating
  M1 = 1, // Military Pilot License
  M2 = 3, // Military Instrument Rating
  M3 = 7, // Military Multi-Engine Rating
  M4 = 15, // Military Mission Ready Pilot
}

// Controller Ratings
export enum ControllerRating {
  INAC = -1, // Inactive
  SUS = 0, // Suspended
  OBS = 1, // Observer
  S1 = 2, // Tower Trainee
  S2 = 3, // Tower Controller
  S3 = 4, // Senior Student
  C1 = 5, // Enroute Controller
  C2 = 6, // Controller 2 (not in use)
  C3 = 7, // Senior Controller
  I1 = 8, // Instructor
  I2 = 9, // Instructor 2 (not in use)
  I3 = 10, // Senior Instructor
  SUP = 11, // Supervisor
  ADM = 12, // Administrator
}

// Pilot Ratings Map
export const PilotRatingMap: Record<string, string> = {
  NEW: "Basic Member",
  PPL: "Private Pilot License",
  IR: "Instrument Rating",
  CMEL: "Commercial Multi-Engine License",
  ATPL: "Airline Transport Pilot License",
  FI: "Flight Instructor",
  FE: "Flight Examiner",
};

// Military Ratings Map
export const MilitaryRatingMap: Record<string, string> = {
  M0: "No Military Rating",
  M1: "Military Pilot License",
  M2: "Military Instrument Rating",
  M3: "Military Multi-Engine Rating",
  M4: "Military Mission Ready Pilot",
};

// Controller Ratings Map
export const ControllerRatingMap: Record<string, string> = {
  INAC: "Inactive",
  SUS: "Suspended",
  OBS: "Observer",
  S1: "Tower Trainee",
  S2: "Tower Controller",
  S3: "Senior Student",
  C1: "Enroute Controller",
  C2: "Controller 2 (not in use)",
  C3: "Senior Controller",
  I1: "Instructor",
  I2: "Instructor 2 (not in use)",
  I3: "Senior Instructor",
  SUP: "Supervisor",
  ADM: "Administrator",
};

export const RatingMap: Record<number, string> = {
  1: "OBS",
  2: "S1",
  3: "S2",
  4: "S3",
  5: "C1",
  6: "C3",
  7: "I1",
  8: "I3",
  9: "SUP",
  10: "ADM",
};
