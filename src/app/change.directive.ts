import { Directive, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core'
@Directive({
  selector: '[appChange]'
})
export class ChangeDirective implements OnInit{

  constructor(private el:ElementRef) { }
ngOnInit()
{
  this.el.nativeElement.style.visiblity="hidden";
}
}
