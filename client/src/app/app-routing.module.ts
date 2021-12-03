import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_componenets/login/login.component';
import { PageNotFoundComponent } from './_componenets/page-not-found/page-not-found.component';
import { RegistrationComponent } from './_componenets/registration/registration.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'doctor', canActivate: [AuthGuard], loadChildren: () => import('./_modules/doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'patient', canActivate: [AuthGuard], loadChildren: () => import('./_modules/patient/patient.module').then(m => m.PatientModule) },
  { path: '', redirectTo: '/login', pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
