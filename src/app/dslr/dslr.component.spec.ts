import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DslrComponent } from './dslr.component';

describe('DslrComponent', () => {
  let component: DslrComponent;
  let fixture: ComponentFixture<DslrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DslrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DslrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
