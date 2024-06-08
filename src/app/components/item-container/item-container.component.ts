import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTaskComponent } from '../item-task/item-task.component';
import { TaskService } from '../../services/task.service';
import { TaskLoadService } from '../../services/task-load.service';
import { Task } from '../../interfaces/task';
import { AuthService } from '../../services/auth.service';
import { toZonedTime, format } from 'date-fns-tz';

@Component({
  selector: 'app-item-container',
  standalone: true,
  imports: [ItemTaskComponent, CommonModule],
  templateUrl: './item-container.component.html',
  styleUrl: './item-container.component.css'
})
export class ItemContainerComponent {
  tasksByDate: { date: string, fechaFormato: string, tasks: Task[] }[] = [];
  currentUser: any;

  constructor(private authService: AuthService, private taskService: TaskService, private taskLoadService: TaskLoadService) { }

  ngOnInit(): void {
    // Obtener el usuario actualmente autenticado
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadTasks(user.id); // Cargar las tareas del usuario actual
      }
    });

    // Suscrito al evento de nueva tarea agregada.
    this.taskLoadService.taskAdded$.subscribe(() => {
      this.loadTasks(this.currentUser.id); // Vuelve a cargar las tareas cuando se agrega una nueva tarea
    });

    // Suscrito al evento de nueva tarea/s eliminada.
    this.taskLoadService.taskRemoved$.subscribe(() => {
      this.loadTasks(this.currentUser.id); // Vuelve a cargar las tareas cuando se agrega una nueva tarea
    })
  }

  loadTasks(userId: number) {
    this.taskService.getTasksByUserId(userId).subscribe(tasks => {
      // Agrupar tareas por fecha
      this.tasksByDate = this.groupTasksByDate(tasks);
    });
  }

  // onTaskAdded() {
  //   // Llamado después de que se agrega una nueva tarea
  //   // Vuelve a cargar las tareas para refrescar la lista
  //   this.loadTasks();
  // }

  private groupTasksByDate(tasks: Task[]): { date: string, fechaFormato: string, tasks: Task[] }[] {
    const groupedTasks: { [date: string]: { date: string, fechaFormato: string, tasks: Task[] } } = {};
    tasks.forEach(task => {
      // Verificar si 'creado' está definido antes de intentar acceder.
      if (task.creado) { 
        const { date, time } = this.extractDateAndTime(task.creado);

        const fechaFormato = this.formatDate(date);

        task.c_fecha = date;
        task.c_hora = time;

        if (!groupedTasks[date]) {
          groupedTasks[date] = { date, fechaFormato, tasks: [] };
        }
        groupedTasks[date].tasks.push(task);
        
      }
    });

    // Convertir el objeto en un array.
    return Object.values(groupedTasks);
  }

  private extractDateAndTime(timestamp: string): { date: string, time: string } {
    // Define la zona horaria para Lima, Perú (UTC-5).
    const timeZone = 'America/Lima';
  
    // Crea un objeto Date a partir del timestamp.
    const dateObj = new Date(timestamp);
  
    // Convierte la fecha y hora UTC a la zona horaria especificada.
    const zonedDate = toZonedTime(dateObj, timeZone);
  
    // Fecha en formato 'YYYY-MM-DD' y la hora en formato 'HH:mm:ss'.
    const date = format(zonedDate, 'yyyy-MM-dd', { timeZone });
    const time = format(zonedDate, 'HH:mm a', { timeZone });
  
    return { date, time };
  }

  private formatDate(timestamp: string): string {
    const parteFecha = timestamp.split('-');
    const anio = parteFecha[0];
    const mes = this.getMonthName(parseInt(parteFecha[1]));
    const dia = parteFecha[2];
    return `${dia} ${mes} ${anio}`;
  }

  private getMonthName(mes: number): string {
    const nombreMes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return nombreMes[mes - 1];
  }
}
