import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RouteDefinition } from 'src/app/shared/constants/route-default-redirect';
import { QuestionAndAnswerItem } from 'src/app/shared/models/question-answer.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  questions: QuestionAndAnswerItem[] = [];
  state$: Observable<object> | undefined;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    this.state$ = this.activeRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((item: any) => {
      this.questions = item.questions;
    });
  }

  ngOnInit(): void {}
  backToFormBuilder() {
    this.router.navigateByUrl(
      `${RouteDefinition.Form}/${RouteDefinition.FormBuilder}`,
      { state: { questions: this.questions } }
    );
  }
}
