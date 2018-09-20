import { Directive,HostListener, Output, EventEmitter, ElementRef } from '@angular/core';



@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();
  @Output() offCanvasClickEvent = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    console.log(this._elementRef);
     
    if (!clickedInside) {    
      this.clickOutside.emit(null);
    }else{
      this.offCanvasClickEvent.emit(false);
    }

  }
  

}
  