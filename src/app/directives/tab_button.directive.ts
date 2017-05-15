import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({selector: '[tab-button]'})
export class TabButtonDirective {

  private static tabButtons: TabButtonDirective[] = [];

  @Input('hover-text-color') hoverTextColor: string = 'red';
  @Input('idle-text-color') idleTextColor: string = 'black';
  @Input('hover-background-color') hoverBackgroundColor: string = 'white';
  @Input('idle-background-color') idleBackgroundColor: string = 'white';
  @Input('focus-text-color') focusTextColor: string = 'red';
  @Input('focus-background-color') focusBackgroundColor: string = 'white';
  @Input('focus-border-color') focusBorderColor: string;
  private focused: boolean = false;

  constructor(private el: ElementRef) {
    TabButtonDirective.tabButtons.push(this);
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    if (!this.focused) {
      this.el.nativeElement.style.color = this.hoverTextColor;
      this.el.nativeElement.style.background = this.hoverBackgroundColor;
    }
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    if (!this.focused) {
      this.el.nativeElement.style.color = this.idleTextColor;
      this.el.nativeElement.style.background = this.idleBackgroundColor;
    }
  }

  @HostListener('click')
  private onClick(): void {
    this.select();
  }

  select(): void {
    this.focused = true;
    this.el.nativeElement.style.color = this.focusTextColor;
    this.el.nativeElement.style.background = this.focusBackgroundColor;
    if (this.focusBorderColor) {
      this.el.nativeElement.style.outline = `2px solid ${this.focusBorderColor}`;
    }
    for (let i = 0; i < TabButtonDirective.tabButtons.length; i++) {
      let button: TabButtonDirective = TabButtonDirective.tabButtons[i];
      if (button !== this) {
        button.deselect();
      }
    }
  }

  deselect(): void {
    this.focused = false;
    this.el.nativeElement.style.color = this.idleTextColor;
    this.el.nativeElement.style.background = this.idleBackgroundColor;
    this.el.nativeElement.style.outline = '';
  }
}
