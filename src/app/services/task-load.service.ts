import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskLoadService {

  constructor() { }

  private taskAddedSource = new Subject<void>();
  private taskRemovedSource = new Subject<void>();

  taskAdded$ = this.taskAddedSource.asObservable();
  taskRemoved$ = this.taskRemovedSource.asObservable();

  announceTaskAdded() {
    this.taskAddedSource.next();
  }

  announceTaskRemoved() {
    this.taskRemovedSource.next();
  }
}
