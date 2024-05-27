export class ReservationsDTO {

  constructor(data:Partial<ReservationsDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  statut?: string|null;
  utilisateur?: number|null;
  seance?: number|null;

}
