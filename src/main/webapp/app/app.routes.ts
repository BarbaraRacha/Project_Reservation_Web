import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UtilisateursListComponent } from './utilisateurs/utilisateurs-list.component';
import { UtilisateursAddComponent } from './utilisateurs/utilisateurs-add.component';
import { UtilisateursEditComponent } from './utilisateurs/utilisateurs-edit.component';
import { SeancesListComponent } from './seances/seances-list.component';
import { SeancesAddComponent } from './seances/seances-add.component';
import { SeancesEditComponent } from './seances/seances-edit.component';
import { ReservationsListComponent } from './reservations/reservations-list.component';
import { ReservationsAddComponent } from './reservations/reservations-add.component';
import { ReservationsEditComponent } from './reservations/reservations-edit.component';
import { JurysListComponent } from './jurys/jurys-list.component';
import { JurysAddComponent } from './jurys/jurys-add.component';
import { JurysEditComponent } from './jurys/jurys-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'utilisateurss',
    component: UtilisateursListComponent,
    title: $localize`:@@utilisateurs.list.headline:Utilisateurses`
  },
  {
    path: 'utilisateurss/add',
    component: UtilisateursAddComponent,
    title: $localize`:@@utilisateurs.add.headline:Add Utilisateurs`
  },
  {
    path: 'utilisateurss/edit/:id',
    component: UtilisateursEditComponent,
    title: $localize`:@@utilisateurs.edit.headline:Edit Utilisateurs`
  },
  {
    path: 'seancess',
    component: SeancesListComponent,
    title: $localize`:@@seances.list.headline:Seanceses`
  },
  {
    path: 'seancess/add',
    component: SeancesAddComponent,
    title: $localize`:@@seances.add.headline:Add Seances`
  },
  {
    path: 'seancess/edit/:id',
    component: SeancesEditComponent,
    title: $localize`:@@seances.edit.headline:Edit Seances`
  },
  {
    path: 'reservationss',
    component: ReservationsListComponent,
    title: $localize`:@@reservations.list.headline:Reservationses`
  },
  {
    path: 'reservationss/add',
    component: ReservationsAddComponent,
    title: $localize`:@@reservations.add.headline:Add Reservations`
  },
  {
    path: 'reservationss/edit/:id',
    component: ReservationsEditComponent,
    title: $localize`:@@reservations.edit.headline:Edit Reservations`
  },
  {
    path: 'juryss',
    component: JurysListComponent,
    title: $localize`:@@jurys.list.headline:Juryses`
  },
  {
    path: 'juryss/add',
    component: JurysAddComponent,
    title: $localize`:@@jurys.add.headline:Add Jurys`
  },
  {
    path: 'juryss/edit/:id',
    component: JurysEditComponent,
    title: $localize`:@@jurys.edit.headline:Edit Jurys`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
