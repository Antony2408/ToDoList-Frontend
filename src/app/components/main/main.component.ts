import { Component } from '@angular/core';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ItemContainerComponent } from '../item-container/item-container.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewTaskComponent, ItemContainerComponent, MatIconModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.closeCurrentUser();
    this.router.navigate(['/']);
  }
}
