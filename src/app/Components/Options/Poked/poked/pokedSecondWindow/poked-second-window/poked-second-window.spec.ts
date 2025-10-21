import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedSecondWindow } from './poked-second-window';

describe('PokedSecondWindow', () => {
  let component: PokedSecondWindow;
  let fixture: ComponentFixture<PokedSecondWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedSecondWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedSecondWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
