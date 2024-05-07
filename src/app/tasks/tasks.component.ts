import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from "@angular/material/dialog";

import {Task} from '../task';
import { TaskService } from '../task.service';

import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { ModalAddComponent } from '../modal-add/modal-add.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskDetailComponent,
    ModalAddComponent,
    CommonModule,
    CdkDropList,
    CdkDragPlaceholder,
    CdkDrag
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    public taskService: TaskService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(n => n.id !== task.id);
    this.taskService.deleteTask(task.id).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      data: '',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.taskService.addTask( result as Task )
        .subscribe(task => {
          this.tasks.push(task);
      });
      }
    });
  }
}
