import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageValidatorComponent } from './error-message-validator.component';

describe('ErrorMessageValidatorComponent', () => {
  let component: ErrorMessageValidatorComponent;
  let fixture: ComponentFixture<ErrorMessageValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorMessageValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
