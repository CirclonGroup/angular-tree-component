import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeDraggedElement<T> {
  _draggedElement: T = null;

  set(draggedElement: T) {
    this._draggedElement = draggedElement;
  }

  get(): T {
    return this._draggedElement;
  }

  isDragging(): boolean {
    return !!this.get();
  }
}
