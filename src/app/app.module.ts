import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatSnackBarModule,
         MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import { TypographyDialogComponent } from './dialogs/typography-dialog/typography-dialog.component';
import { HeaderDialogComponent } from './dialogs/header-dialog/header-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    InfoDialogComponent,
    TypographyDialogComponent,
    HeaderDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    InfoDialogComponent,
    TypographyDialogComponent,
    HeaderDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
