import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolieComponent } from './folie.component';

describe('FolieComponent', () => {
  let component: FolieComponent;
  let fixture: ComponentFixture<FolieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
