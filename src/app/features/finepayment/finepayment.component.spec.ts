import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinepaymentComponent } from './finepayment.component';

describe('FinepaymentComponent', () => {
  let component: FinepaymentComponent;
  let fixture: ComponentFixture<FinepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinepaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
