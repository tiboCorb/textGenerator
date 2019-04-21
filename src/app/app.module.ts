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
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';


import { MatRippleModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    AutofocusDirective,
    PointFormComponent,
    OptionChooserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    AppRoutingModule,
    DragDropModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
