import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEBookComponent } from './add-e-book.component';

describe('AddEBookComponent', () => {
  let component: AddEBookComponent;
  let fixture: ComponentFixture<AddEBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
