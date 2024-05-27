import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJuryComponent } from './edit-jury.component';

describe('EditJuryComponent', () => {
  let component: EditJuryComponent;
  let fixture: ComponentFixture<EditJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
