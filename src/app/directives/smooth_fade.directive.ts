import {Directive, ElementRef, Input} from '@angular/core';

@Directive({selector: '[smooth-fade]'})
export class SmoothFadeDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.webkitTransition = 'opacity ease 200ms, max-height linear 1ms, max-width linear 1ms';
    this.el.nativeElement.style.transition = 'opacity ease 200ms, max-height linear 1ms, max-width linear 1ms';
  }

  @Input('smooth-fade')
  set isVisible(visible: boolean) {
    this.el.nativeElement.style.opacity = visible === true ? 1 : 0;
    this.el.nativeElement.style.maxHeight = visible === true ? '' : 0;
    this.el.nativeElement.style.maxWidth = visible === true ? '' : 0;
    this.el.nativeElement.style.overflow = visible === true ? '' : 'hidden';
  }
}
