import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { RouteDefinition } from './shared/constants/route-default-redirect';

let routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: RouteDefinition.Form,
    loadChildren: () =>
      import('./components/form/form.module').then((m) => m.FormModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
