import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatDialogClose, MatDialogRef, MatDialogModule} from "@angular/material/dialog";

import {TaskService} from "../task.service";

import {AddTaskComponent} from "../add-task/add-task.component";


@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [
    AddTaskComponent,
    MatDialogClose,
    MatDialogModule
  ],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.scss'
})

export class ModalAddComponent {
  @Input() dismiss?: any;
  @Output() addTask = new EventEmitter<object>();
  editShow: boolean = true;

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<ModalAddComponent>,
  ) {}

  onEditShowChange(event: boolean): void {
    if (!event) {
      this.dialogRef.close();
    }
  }

  onAddTask(newTask: object): void {
    this.dialogRef.close(newTask);
  }
}
