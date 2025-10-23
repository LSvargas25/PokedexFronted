import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTrainerInfo } from './screen-trainer-info';

describe('ScreenTrainerInfo', () => {
  let component: ScreenTrainerInfo;
  let fixture: ComponentFixture<ScreenTrainerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenTrainerInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTrainerInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
