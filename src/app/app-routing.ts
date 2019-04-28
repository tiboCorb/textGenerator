import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './_components/options/options.component';
import { OptionChooserComponent } from './_components/option-chooser/option-chooser.component';

const routes: Routes = [
  { path: 'text_creator', component: OptionsComponent },
  { path: 'json_chooser', component: OptionChooserComponent },
  { path: '**', component: OptionChooserComponent }];

export const appRouting = RouterModule.forRoot(routes);
