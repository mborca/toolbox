import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TextDialogComponent } from './text-dialog/text-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    TextDialogComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    TextDialogComponent,
    InfoDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
