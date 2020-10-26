import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {

  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hover('');
  }

  hover(background: string) {
  }
}
