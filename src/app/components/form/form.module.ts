import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { AnswersComponent } from './pages/aswers/answers/answers.component';
import { BuilderComponent } from './pages/builder/builder/builder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewQuestionDialog } from './dialogs/new-question-dialog.component';
@NgModule({
  declarations: [BuilderComponent, AnswersComponent,NewQuestionDialog],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class FormModule {}
