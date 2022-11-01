import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteDefinition } from 'src/app/shared/constants/route-default-redirect';
import { AnswersComponent } from './pages/aswers/answers/answers.component';
import { BuilderComponent } from './pages/builder/builder/builder.component';

let routes: Routes = [
  { path: '', redirectTo: RouteDefinition.FormBuilder, pathMatch: "full" },
  { path: RouteDefinition.FormBuilder, component: BuilderComponent },
  { path:  RouteDefinition.FormAnswers, component: AnswersComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
