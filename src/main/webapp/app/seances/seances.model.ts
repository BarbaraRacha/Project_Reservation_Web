export class SeancesDTO {

  constructor(data:Partial<SeancesDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  date?: string|null;
  heure?: number|null;
  maxParticipants?: number|null;

}
