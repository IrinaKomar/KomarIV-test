import { Routes} from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: 'task-manager', component: TasksComponent },
  { path: '', redirectTo: '/task-manager', pathMatch: 'full' },
];
