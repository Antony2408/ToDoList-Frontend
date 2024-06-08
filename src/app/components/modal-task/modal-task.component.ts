import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../../interfaces/task';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-task',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, FormsModule, CommonModule, MatDialogModule],
  templateUrl: './modal-task.component.html',
  styleUrl: './modal-task.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ModalTaskComponent {
  @Input() titulo?: string;
  @Input() descripcion?: string;
  @Input() tiempo?: string;
  @Input() estado: TaskStatus = 'pendiente'; // Valor por defecto

  estados: { value: TaskStatus, viewValue: string }[] = [
    { value: 'pendiente', viewValue: 'Pendiente' },
    { value: 'completado', viewValue: 'Completado' },
    { value: 'en-proceso', viewValue: 'En proceso' }
  ];
}
