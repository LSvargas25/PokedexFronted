import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BScreenPoked } from './bscreen-poked';

describe('BScreenPoked', () => {
  let component: BScreenPoked;
  let fixture: ComponentFixture<BScreenPoked>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BScreenPoked]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BScreenPoked);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
