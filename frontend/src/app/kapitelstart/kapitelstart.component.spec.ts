import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapitelstartComponent } from './kapitelstart.component';

describe('KapitelstartComponent', () => {
  let component: KapitelstartComponent;
  let fixture: ComponentFixture<KapitelstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KapitelstartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapitelstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
