import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VccInputComponent } from './vcc-input.component';

describe('VccInputComponent', () => {
  let component: VccInputComponent;
  let fixture: ComponentFixture<VccInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VccInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VccInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
