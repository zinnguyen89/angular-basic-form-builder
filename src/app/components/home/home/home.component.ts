import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouteDefinition } from 'src/app/shared/constants/route-default-redirect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}
  openAddNewQuestionDialog() {
    this.router.navigate([`${RouteDefinition.Form}`]);
  }
}
