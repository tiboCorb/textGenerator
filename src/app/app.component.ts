import { Component } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isOptionPage: boolean;

  constructor(private router: Router) {
    this.isOptionPage = false;
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.isOptionPage = !this.isOptionPage;
      }

    });
  }

}
