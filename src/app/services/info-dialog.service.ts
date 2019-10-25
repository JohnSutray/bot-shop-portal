import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InfoDialogData } from '../models/info-dialog-data.model';
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class InfoDialogService {
  constructor(
    private readonly matDialog: MatDialog,
  ) {
  }

  open(data: InfoDialogData) {
    this.matDialog.open(InfoDialogComponent, {
      data,
      autoFocus: false,
    });
  }
}
