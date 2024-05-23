import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMagazineComponent } from './update-magazine.component';

describe('UpdateMagazineComponent', () => {
  let component: UpdateMagazineComponent;
  let fixture: ComponentFixture<UpdateMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMagazineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
