import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {
    path:'home',
    canLoad:[AuthGuard],
    loadChildren:()=>import('./home/home.module').then(mod=>mod.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
