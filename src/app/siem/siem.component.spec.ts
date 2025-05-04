import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiemComponent } from './siem.component';

describe('SiemComponent', () => {
  let component: SiemComponent;
  let fixture: ComponentFixture<SiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
