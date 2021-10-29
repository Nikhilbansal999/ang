import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {
  constructor(private el:ElementRef){this.setup()}
setup()
{

  const parent=this.el.nativeElement.parentNode;
  const span=document.createElement('span');
  span.style.border="none";
  // span.style.margin="-70px 0px 10px 260px";
  span.style.outline="none";
  span.style.backgroundColor="#fff";
  span.innerHTML='<i class="fas fa-eye" ></i>';
  span.addEventListener('click',()=>this.toggle(span));
parent.appendChild(span);
}
private _shown=false;
toggle(span:HTMLElement)
{
  this._shown=!this._shown;
  if(this._shown)
  {
    this.el.nativeElement.setAttribute('type','text');
    span.innerHTML = '<i class="fas fa-eye-slash" ></i>';
  }
  else
  {
    this.el.nativeElement.setAttribute('type','password');
    span.innerHTML = '<i class="fas fa-eye"></i>';
  }
}
}
