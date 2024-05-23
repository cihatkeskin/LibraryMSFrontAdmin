import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEBookComponent } from './update-e-book.component';

describe('UpdateEBookComponent', () => {
  let component: UpdateEBookComponent;
  let fixture: ComponentFixture<UpdateEBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
