import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainBscreen } from './train-bscreen';

describe('TrainBscreen', () => {
  let component: TrainBscreen;
  let fixture: ComponentFixture<TrainBscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainBscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainBscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
