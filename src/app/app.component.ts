import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskComponent } from './components/modal-task/modal-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
  constructor(public dialog: MatDialog) {}

  // openDialog(): void {
  //   this.dialog.open(ModalTaskComponent);
  // }
}
