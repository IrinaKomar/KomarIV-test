import {Component, Input, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule, MatDatepickerIntl} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentDateAdapter} from '@angular/material-moment-adapter';

import {Task} from '../task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})


export class AddTaskComponent implements OnInit {
  @Input() data: Task | undefined;
  @Input() editShow!: boolean;

  @Output() editShowChange = new EventEmitter<boolean>();
  @Output() addTask = new EventEmitter<object>();

  newTask: {
    title: string;
    date: string;
    description: string
  }

  dateTask = new FormControl<any|null>(null);

  constructor(
    public taskService: TaskService,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    this.newTask = {
      title: '',
      date: '',
      description: ''
    };
  }

  ngOnInit(){
    if (this.data) {
      let d = this.data.date;
      d = d.split('/').reverse().join('-');
      this.dateTask.setValue(new Date(d));
    }
  }

  submitApplication(description: string, title: string, date: string, event: any): void {
    event.preventDefault();
    if (!description || !title || !date) { return; }
    if (this.data) {
      this.data.title = title;
      this.data.description = description;
      this.data.date = date;

      this.taskService.updateTask(this.data)
      .subscribe(() => console.log('save'));

      this.editShow = false;
      this.editShowChange.emit(this.editShow);
    }
    else {
      this.newTask.title = title;
      this.newTask.date = date;
      this.newTask.description = description;
      this.addTask.emit(this.newTask);
    }
  }

  cancel(): void {
    this.editShow = false;
    this.editShowChange.emit(this.editShow);
  }
}
