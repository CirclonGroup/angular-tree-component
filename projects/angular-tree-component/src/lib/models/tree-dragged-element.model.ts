import { Injectable } from '@angular/core';

@Injectable()
export class TreeDraggedElement {
  _draggedElement: any = null;

  set(draggedElement: any) {
    this._draggedElement = draggedElement;
  }

  get(): any {
    return this._draggedElement;
  }

  isDragging() {
    return !!this.get();
  }
}
