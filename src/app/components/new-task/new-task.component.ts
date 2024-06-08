import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { TaskLoadService } from '../../services/task-load.service';
import { SharedTaskService } from '../../services/shared-task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @ViewChild('tituloInput') tituloInput!: ElementRef;
  @ViewChild('descripcionInput') descripcionInput!: ElementRef;

  currentUser: any;
  task: Task = {
    titulo: '',
    descripcion: '',
    estado: 'pendiente'
  };

  constructor(private authService: AuthService, private taskService: TaskService, private taskLoadService: TaskLoadService,
    private sharedTaskService: SharedTaskService
  ) {}

  ngOnInit(): void {
    // Obtén el usuario actualmente autenticado
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (user) {
        // Si hay un usuario autenticado, actualiza el usuario_id de la tarea
        this.task.usuario_id = user.id;
      }
    });
  }

  addTask() {
    if (this.task.titulo) {
      console.log('Datos de la tarea a enviar:', this.task);

      this.taskService.addTask(this.task).subscribe(() => {
        this.taskLoadService.announceTaskAdded(); // Anuncia que se agrego una nueva tarea.
        // this.router.navigate(['/']);
      });
      this.tituloInput.nativeElement.value = '';
      this.descripcionInput.nativeElement.value = '';
    }
  }

  deleteSelectedTasks() {
    this.sharedTaskService.selectedTaskIds.forEach(id => {
      this.taskService.deleteTask(id).subscribe(() => {
        console.log("Tarea eliminada con éxito:", id);
        this.taskLoadService.announceTaskRemoved(); // Anuncia que se quito una tarea.
      });
    });
    // Limpiar el arreglo de tareas seleccionadas después de eliminarlas
    this.sharedTaskService.selectedTaskIds = [];
  }
}
