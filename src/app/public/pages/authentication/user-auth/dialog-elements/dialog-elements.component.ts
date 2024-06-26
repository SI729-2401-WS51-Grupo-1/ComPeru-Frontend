import {Component, inject} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-elements',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialog-elements.component.html',
  styleUrl: './dialog-elements.component.css'
})
export class DialogElementsComponent {
  dialog = inject(MatDialog);
  //constructor(public dialog: MatDialog) {}
  constructor() {

  }
  errorMessage: string | null = null;

  openDialog(errCode: string) {
    this.errorMessage = errCode;
    this.dialog.open(DialogElements);
  }
}
export class DialogElements {}
