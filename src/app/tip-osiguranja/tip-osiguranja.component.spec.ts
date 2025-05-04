import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipOsiguranjaComponent } from './tip-osiguranja.component';

describe('TipOsiguranjaComponent', () => {
  let component: TipOsiguranjaComponent;
  let fixture: ComponentFixture<TipOsiguranjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipOsiguranjaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipOsiguranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
