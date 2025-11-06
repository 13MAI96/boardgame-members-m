import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let matDialog: string
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close')}},
        { provide: MAT_DIALOG_DATA, useValue: 'Mock Data'}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    matDialog = TestBed.inject(MAT_DIALOG_DATA);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onNoClick is called', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

});
