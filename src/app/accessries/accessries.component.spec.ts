import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessriesComponent } from './accessries.component';

describe('AccessriesComponent', () => {
  let component: AccessriesComponent;
  let fixture: ComponentFixture<AccessriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
