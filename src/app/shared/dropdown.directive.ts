import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isDropdownShowing:Boolean =  false;

  constructor(private renderer:Renderer2, private elementRef:ElementRef) {

  }

  @HostListener('click') dropDownClicked(){
    //using renderer
    // if(!this.isDropdownShowing){
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // }else{
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // }

    //using hostbinding
    this.isDropdownShowing = !this.isDropdownShowing;
  }
}
