import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog} from '@angular/material/dialog';

import {Task} from '../task';

import {ModalDetailComponent} from "../modal-detail/modal-detail.component";


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    ModalDetailComponent,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})

export class TaskDetailComponent implements OnInit {
  @Input() task?: Task;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();

  condition: string;

  constructor(public dialog: MatDialog) {
     this.condition = ''
  }

  ngOnInit(){
    if (this.task) {
      this.getDate(this.task.date);
    }
  }

  openDialog(): void {
    if(this.task){
      const dialogRef = this.dialog.open(ModalDetailComponent, {
        data: this.task,
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'delete') {
          this.deleteTask.emit(this.task);
        }
        else {
          if (this.task) {
            this.getDate(this.task.date);
          }
        }
      });
    }
  }

  private getDate(d: string): string {
    this.condition = '';
    d = d.split('/').reverse().join('-');
    const taskDate = new Date(d);
    const todayDate = new Date();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);

    if(taskDate < todayDate) {
      this.condition = 'error'
    }
    else if (taskDate <= currentDate) {
      this.condition = 'warning'
    }

    return this.condition
  }
}
