import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancesComponent } from './seances.component';

describe('SeancesComponent', () => {
  let component: SeancesComponent;
  let fixture: ComponentFixture<SeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
