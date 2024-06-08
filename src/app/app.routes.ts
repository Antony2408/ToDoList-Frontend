import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ItemTaskComponent } from './components/item-task/item-task.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'main', component: MainComponent },

];

// No es necesario. De api. Conexcion. MgModule
// import { Routes } from '@angular/router';
// import { NewTaskComponent } from './components/new-task/new-task.component';
// import { ItemContainerComponent } from './components/item-container/item-container.component';

// export const routes: Routes = [
//     { path: '', component: ItemContainerComponent },
//     { path: 'new-task', component: NewTaskComponent }
// ];
