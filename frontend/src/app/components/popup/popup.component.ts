import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-popup',
    imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.scss'
})
export class PopupComponent {
  readonly dialogRef = inject(MatDialogRef<PopupComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
