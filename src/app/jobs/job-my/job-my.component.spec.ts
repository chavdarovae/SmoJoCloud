import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMyComponent } from './job-my.component';

describe('JobMyComponent', () => {
  let component: JobMyComponent;
  let fixture: ComponentFixture<JobMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobMyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
