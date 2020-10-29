import { Injectable } from '@angular/core';
import { NavigationNode } from './navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private gettingStartedRoute: NavigationNode = {
    title: 'Getting Started',
    url: ''
  };

  private examplesRoute: NavigationNode = {
    title: 'Examples',
    children: [
      { title: 'Basic Usage', url: 'basic' }
    ]
  };

  constructor() { }
}
