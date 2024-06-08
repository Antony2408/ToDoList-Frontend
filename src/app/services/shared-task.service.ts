import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedTaskService {
  selectedTaskIds: number[] = [];
  
  constructor() { }
}
