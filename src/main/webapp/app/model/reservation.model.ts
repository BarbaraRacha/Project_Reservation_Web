export interface Utilisateur {
  id: string,
  nom: string,
  email: string,
  dateCreated: string,
  lastUpdated: string
}

export interface Seance {
  id: string,
  date: string,
  heure: number,
  maxParticipants: number,
  jurys: Jury[],
  dateCreated: string,
  lastUpdated: string
}

export interface Jury {
  id: string,
  nom: string,
  seances: Seance[],
  dateCreated: string,
  lastUpdated: string
}

export enum ReservationStatus {
  PENDING, CONFIRMED, CANCELLED
}

export interface Reservation {
  id: string,
  statut: ReservationStatus,
  utilisateur: Utilisateur,
  seance: Seance,
  dateCreated: string,
  lastUpdated:string
}
