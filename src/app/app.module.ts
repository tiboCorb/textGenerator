import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';


import { MatRippleModule } from '@angular/material/core';

import { appRouting } from './app-routing';
import { AppComponent } from './app.component';
import { OptionsComponent } from './_components/options/options.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutofocusDirective } from './_directives/autofocus.directive';
import { PointFormComponent } from './_components/point-form/point-form.component';
import { OptionChooserComponent } from './_components/option-chooser/option-chooser.component';
import { TextLinkComponent } from './_components/text-link/text-link.component';
import { LoginComponent } from './_components/login/login.component';
import { ConnectionService } from './_services/connection.service';
import { ComfirmDialogComponent } from './_components/comfirm-dialog/comfirm-dialog.component';
import { SpaceCheckBoxComponent } from './_components/space-check-box/space-check-box.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    AutofocusDirective,
    PointFormComponent,
    OptionChooserComponent,
    TextLinkComponent,
    LoginComponent,
    ComfirmDialogComponent,
    SpaceCheckBoxComponent
  ],
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    TextFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    appRouting,
    DragDropModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRippleModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    ComfirmDialogComponent,
    ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
