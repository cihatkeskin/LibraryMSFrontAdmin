import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublisherComponent } from './update-publisher.component';

describe('UpdatePublisherComponent', () => {
  let component: UpdatePublisherComponent;
  let fixture: ComponentFixture<UpdatePublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
