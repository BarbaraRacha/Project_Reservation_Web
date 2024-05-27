export class JurysDTO {

  constructor(data:Partial<JurysDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  nom?: string|null;
  seances?: number[]|null;

}
