import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInfo } from './trainer-info';

describe('TrainerInfo', () => {
  let component: TrainerInfo;
  let fixture: ComponentFixture<TrainerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
