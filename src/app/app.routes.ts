import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { PetComponent } from './components/pet/pet.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'setting', component: SettingsComponent,
  },
  { 
    path: 'map', component: MapComponent 
  },
  {
    path: 'pet', component: PetComponent,
  },
  {
    path: 'user', component: UserComponent
  }
];
