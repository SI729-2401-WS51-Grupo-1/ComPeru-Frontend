import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";

export const routes: Routes = [
  {path: 'users',component: UserPageComponent},
  {path: 'entrepreneur', component: EntrepreneurPageComponent},
  { path: '', redirectTo: 'users', pathMatch: 'full' }

];
