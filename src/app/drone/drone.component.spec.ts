import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
  let component: DroneComponent;
  let fixture: ComponentFixture<DroneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
