import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenIconComponent } from './open-icon.component';

describe('OpenIconComponent', () => {
  let component: OpenIconComponent;
  let fixture: ComponentFixture<OpenIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
