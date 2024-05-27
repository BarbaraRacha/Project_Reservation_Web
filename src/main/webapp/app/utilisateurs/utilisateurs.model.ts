export class UtilisateursDTO {

  constructor(data:Partial<UtilisateursDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  nom?: string|null;
  email?: string|null;

}
