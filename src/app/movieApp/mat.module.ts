import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        MatSnackBarModule,
        MatChipsModule
      } from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule
  ],
})
export class MatModule { }
