import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogModule} from '@angular/material/dialog';

import {Task} from '../task';
import { TaskService } from '../task.service';

import {AddTaskComponent} from "../add-task/add-task.component";


@Component({
  selector: 'app-modal-detail',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskComponent,
    MatDialogClose,
    MatDialogModule
  ],
  templateUrl: './modal-detail.component.html',
  styleUrl: './modal-detail.component.scss'
})

export class ModalDetailComponent {
  task: Task | undefined;
  editShow: boolean = false;

  @Output() updateTask = new EventEmitter<any>();

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<ModalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {}

  onNoClick(): void {
    this.dialogRef.close('delete');
  }

  edit(): void {
    this.editShow = true;
  }
}
