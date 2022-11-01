import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnswerOptionItem,
  QuestionAndAnswerItem,
} from 'src/app/shared/models/question-answer.model';

@Component({
  selector: 'new-question-dialog',
  templateUrl: './new-question-dialog.component.html',
  styleUrls: ['./new-question-dialog.component.scss'],
})
export class NewQuestionDialog {
  questionTypes: any[] = [
    {
      id: 'paragraph',
      name: 'Paragraph',
    },
    {
      id: 'multi-select',
      name: 'CheckBox List',
    },
  ];
  isUserOwn: boolean = false;
  isRequired: boolean = false;
  questionContent: string = '';
  questionTypeSelected: string = '';
  answerOptions: AnswerOptionItem[] = [];
  questionAndAnswerItem: QuestionAndAnswerItem = new QuestionAndAnswerItem();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    public matDialogRef: MatDialogRef<NewQuestionDialog>,
    private snackBar: MatSnackBar
  ) {}
  onQuestionTypeChange($event: any) {
    if (
      this.questionTypeSelected == 'multi-select' &&
      this.answerOptions.length == 0
    ) {
      this.answerOptions.push({
        content: '',
        id: this.answerOptions.length,
        isSelected: false,
      });
    } else {
    }
  }
  submitQuestion() {
    if (this.questionTypeSelected == '') {
      this.showAlert('Please select the question type');
      return;
    }
    if (this.questionContent == '') {
      this.showAlert('Please fill the question');
      return;
    }

    if (
      this.questionTypeSelected == 'multi-select' &&
      this.answerOptions.find((item) => item.content == '')
    ) {
      this.showAlert('Please fill the answer');
      return;
    }
    this.questionAndAnswerItem.isRequired = this.isRequired;
    this.questionAndAnswerItem.questionContent = this.questionContent;
    this.questionAndAnswerItem.isUserOwn = this.isUserOwn;
    this.questionAndAnswerItem.questionType = 'text';
    this.questionAndAnswerItem.answerType =
      this.questionTypeSelected == 'paragraph' ? 'paragraph' : 'multi-select';
    this.questionAndAnswerItem.answerOptions =
      this.questionTypeSelected == 'multi-select' ? this.answerOptions : [];
    this.matDialogRef.close({
      questionAndAnswerItem: this.questionAndAnswerItem,
    });
  }
  private showAlert(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  addAnotherAnswer() {
    this.answerOptions.push({
      content: '',
      id: this.answerOptions.length,
      isSelected: false,
    });
  }
}
