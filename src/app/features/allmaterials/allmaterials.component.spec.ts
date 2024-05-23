import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmaterialsComponent } from './allmaterials.component';

describe('AllmaterialsComponent', () => {
  let component: AllmaterialsComponent;
  let fixture: ComponentFixture<AllmaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllmaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
