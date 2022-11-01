import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RouteDefinition } from 'src/app/shared/constants/route-default-redirect';
import { isNil } from 'lodash';
import {
  AnswerOptionItem,
  QuestionAndAnswerItem,
} from 'src/app/shared/models/question-answer.model';
import { NewQuestionDialog } from '../../../dialogs/new-question-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  languagues: AnswerOptionItem[] = [
    {
      id: 1,
      content: 'Typescript',
      isSelected: false,
    },
    {
      id: 2,
      content: 'Python',
      isSelected: false,
    },
    {
      id: 3,
      content: 'C#',
      isSelected: false,
    },
  ];
  basicInformation: string = '';
  questions: QuestionAndAnswerItem[] = [
    {
      id: 1,
      questionContent: 'Please tell us about yourself',
      questionType: 'text',
      isShowAnswer: true,
      answerType: 'paragraph',
      answerContent: '',
      answerOptions: [],
      isRequired: true,
      isUserOwn: false,
      userOwnAnswerContent: '',
      isUserOwnSelected: false,
    },
    {
      id: 2,
      questionContent: 'Please select the languages you know',
      questionType: 'text',
      isShowAnswer: true,
      answerType: 'multi-select',
      answerContent: '',
      answerOptions: this.languagues,
      isRequired: true,
      isUserOwn: true,
      userOwnAnswerContent: '',
      isUserOwnSelected: false,
    },
  ];
  state$: Observable<object> | undefined;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.state$ = this.activeRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    if (this.state$) {
      this.state$.subscribe((item: any) => {
        if (item.questions) {
          this.questions = item.questions;
        }
      });
    }
  }

  ngOnInit(): void {}

  addNewAnswer() {
    let dialogRef = this.dialog.open(NewQuestionDialog, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questions.push(result.questionAndAnswerItem);
      }
    });
  }
  reviewAnswer() {
    let contentQuestionInvalid = this.checkValidateAnswers();
    if (contentQuestionInvalid == '') {
      this.router.navigateByUrl(
        `${RouteDefinition.Form}/${RouteDefinition.FormAnswers}`,
        { state: { questions: this.questions } }
      );
    } else {
      this.showAlert(`Please answer the question: ${contentQuestionInvalid}`);
    }
  }

  checkValidateAnswers(): string | any {
    let paragraphAndContentEmpty = this.questions.find(
      (item) =>
        item.isRequired &&
        item.answerType == 'paragraph' &&
        isNil(item.answerContent)
    );
    if (paragraphAndContentEmpty != null) {
      return this.questions.find(
        (item) =>
          item.isRequired &&
          item.answerType == 'paragraph' &&
          isNil(item.answerContent)
      )?.questionContent;
    }
    var multiSelectUserOwnSelectedAndContentEmpty = this.questions.find(
      (item) =>
        item.isRequired &&
        item.answerType == 'multi-select' &&
        item.isUserOwnSelected &&
        isNil(item.userOwnAnswerContent)
    );
    if (multiSelectUserOwnSelectedAndContentEmpty != null) {
      return (
        multiSelectUserOwnSelectedAndContentEmpty.questionContent +
        ' with option Other'
      );
    }
    var multiSelectedAndContentNotEmpty = this.questions.find(
      (item) =>
        item.isRequired &&
        item.answerType == 'multi-select' &&
        item.isUserOwnSelected &&
        item.userOwnAnswerContent != ''
    );
    if (multiSelectedAndContentNotEmpty) {
      return '';
    }
    var multiSelectWithAtleastOneOption = this.questions.find(
      (item) =>
        item.isRequired &&
        item.answerType == 'multi-select' &&
        item.answerOptions.every((option) => !option.isSelected)
    );
    if (multiSelectWithAtleastOneOption != null) {
      return multiSelectWithAtleastOneOption.questionContent;
    }
    return '';
  }

  private showAlert(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }
}
