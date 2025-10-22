import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainAscreen } from './train-ascreen';

describe('TrainAscreen', () => {
  let component: TrainAscreen;
  let fixture: ComponentFixture<TrainAscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainAscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainAscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
