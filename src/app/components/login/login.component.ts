import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('signUp', { static: true }) signUpButton!: ElementRef;
  @ViewChild('signIn', { static: true }) signInButton!: ElementRef;
  @ViewChild('sendButton', { static: true }) sendButton!: ElementRef;
  @ViewChild('nameLabel') nameLabel!: ElementRef;
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  // @ViewChild('titulo', { static: true }) title!: ElementRef;

  isSignInSelected: boolean = true;

  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.renderer.listen(this.signInButton.nativeElement, 'click', () => {
      this.isSignInSelected = true;
      this.renderer.setStyle(this.nameLabel.nativeElement, 'maxHeight', '0');
      this.renderer.setStyle(this.nameLabel.nativeElement, 'overflow', 'hidden');
      this.renderer.setStyle(this.nameLabel.nativeElement, 'transition', 'max-height 0.4s ease-out');
      // this.title.nativeElement.innerHTML = 'INICIAR SESIÓN';
      this.sendButton.nativeElement.innerHTML = 'Entrar';
      this.renderer.addClass(this.signUpButton.nativeElement, 'disable');
      this.renderer.removeClass(this.signInButton.nativeElement, 'disable');
      this.emailInput.nativeElement.value = '';
      this.passwordInput.nativeElement.value = '';
      this.nameInput.nativeElement.value = '';
    });

    this.renderer.listen(this.signUpButton.nativeElement, 'click', () => {
      this.isSignInSelected = false;
      this.renderer.setStyle(this.nameLabel.nativeElement, 'maxHeight', '62px');
      this.renderer.setStyle(this.nameLabel.nativeElement, 'transition', 'max-height 0.4s ease-in');
      // this.title.nativeElement.innerHTML = 'CREAR CUENTA';
      this.sendButton.nativeElement.innerHTML = 'Registrar';
      this.renderer.removeClass(this.signUpButton.nativeElement, 'disable');
      this.renderer.addClass(this.signInButton.nativeElement, 'disable');
      this.renderer.setAttribute(this.nameInput.nativeElement, 'required', 'true');
      this.emailInput.nativeElement.value = '';
      this.passwordInput.nativeElement.value = '';
      this.nameInput.nativeElement.value = '';
    });

  }

  onSubmit(event: Event) {
    event.preventDefault();
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    if (this.isSignInSelected) {
      if (!email || !password) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos');
        return;
      }
      console.log(email);
      console.log(password);
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login success:', response);
          // Redirigir a la otra ventana
          this.router.navigate(['/main']); // Cambia '/todo' por la ruta de tu ventana de tareas
        },
        error => {
          console.error('Login failed:', error);
          // Muestra un mensaje de error al usuario si es necesario
        }
      );
    } else {

      const username = this.nameInput.nativeElement.value;

      if (!email || !password || !username) {
        // Mostrar mensaje de error al usuario indicando que los campos son requeridos
        console.error('Todos los campos son requeridos');
        return;
      }
      
      console.log('Registro:');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Username:', username);

      this.authService.register(username, email, password).subscribe(
        response => {
          console.log('Registro exitoso');
          this.authService.login(email, password).subscribe(
            response => {
              console.log('Login success:', response);
              // Redirigir a la otra ventana
              this.router.navigate(['/main']); // Cambia '/todo' por la ruta de tu ventana de tareas
            },
            error => {
              console.error('Login failed:', error);
            }
          );
        },
        error => {
          console.error('Registro failed:', error);
        }
      );


    }
  }
}





/*
onSubmit(event: Event) {
  event.preventDefault();
  // const email = this.emailInput.nativeElement.value;
  // const password = this.passwordInput.nativeElement.value;

  if (this.isSignInSelected) {
    let email = this.emailInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;
    console.log(email);
    console.log(password);
    this.authService.login(email, password).subscribe(
      response => {
        console.log('Login success:', response);
        // Redirigir a la otra ventana
        this.router.navigate(['/main']); // Cambia '/todo' por la ruta de tu ventana de tareas
      },
      error => {
        console.error('Login failed:', error);
        // Muestra un mensaje de error al usuario si es necesario
      }
    );
  } else {
    let email = this.emailInput.nativeElement.value;
    let password = this.passwordInput.nativeElement.value;
    let username = this.nameInput.nativeElement.value;
    console.log('Registro:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);

    this.authService.register(username, email, password).subscribe(
      response => {
        console.log('Registro exitoso');
        this.router.navigate(['/main']);
      },
      error => {
        console.error('Registro failed:', error);
      }
    );


  }

  // Limpiar los campos después de enviar
  // this.emailInput.nativeElement.value = '';
  // this.passwordInput.nativeElement.value = '';
  // if (!this.isSignInSelected) {
  //   this.nameInput.nativeElement.value = '';
  // }
}*/