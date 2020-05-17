import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewItemDialogComponent } from './preview-item-dialog.component';

describe('PreviewItemDialogComponent', () => {
  let component: PreviewItemDialogComponent;
  let fixture: ComponentFixture<PreviewItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
