import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskStatus } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { SharedTaskService } from '../../services/shared-task.service';

@Component({
  selector: 'app-item-task',
  standalone: true,
  imports: [MatSelectModule, FormsModule, CommonModule, MatCheckboxModule],
  templateUrl: './item-task.component.html',
  styleUrl: './item-task.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ItemTaskComponent {
  @Input() id?: number;
  @Input() titulo?: string;
  @Input() descripcion?: string;
  @Input() tiempo?: string;
  @Input() estado: TaskStatus = 'pendiente'; // Valor por defecto.

  estados: { value: TaskStatus, viewValue: string }[] = [
    { value: 'pendiente', viewValue: 'Pendiente' },
    { value: 'completado', viewValue: 'Completado' },
    { value: 'en-proceso', viewValue: 'En proceso' }
  ];


  constructor(private taskService: TaskService, private sharedTaskService: SharedTaskService) { }

  onStatusChange(event: Event) {
    // console.log(this.id)
    // console.log(this.estado)

    // Llamada al método de servicio para actualizar el estado de la tarea.
    if (this.id) {
      this.taskService.updateTaskStatus(this.id, this.estado).subscribe();
    }
  }

  checkboxChanged(event: MatCheckboxChange) {
    if (this.id) {
      if (event.checked) {
          // La casilla de verificación fue seleccionada
          // Agrega el id de la tarea al vector de ids seleccionados
          this.sharedTaskService.selectedTaskIds.push(this.id);
          console.log(this.id)
      } else {
        // La casilla de verificación fue deseleccionada
        // Elimina el id de la tarea del vector de ids seleccionados
        const index = this.sharedTaskService.selectedTaskIds.indexOf(this.id);
        if (index > -1) {
          this.sharedTaskService.selectedTaskIds.splice(index, 1);
        }
      }
    }
  }

}
