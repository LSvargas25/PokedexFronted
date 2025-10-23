import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BScreenTrainer } from './bscreen-trainer';

describe('BScreenTrainer', () => {
  let component: BScreenTrainer;
  let fixture: ComponentFixture<BScreenTrainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BScreenTrainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BScreenTrainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
