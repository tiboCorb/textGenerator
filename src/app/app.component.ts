import { LoginComponent } from './_components/login/login.component';
import { ConnectionService } from './_services/connection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  private tokenSub: Subscription;
  private routerSub: Subscription;
  public isOptionPage: boolean;
  public tokenReady: boolean;

  constructor(private router: Router, private connectionS: ConnectionService, public dialog: MatDialog) {
    this.isOptionPage = false;
    this.tokenReady = false;
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(ev => setTimeout(() => {
      if (ev instanceof NavigationStart) {
        this.isOptionPage = !this.isOptionPage;
      }
    }
      , 0));
    this.tokenSub = this.connectionS.getToken().subscribe(res => setTimeout(() => this.handleToken(res), 0));
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.tokenSub.unsubscribe();
  }

  private handleToken(token: any) {
    if (token === '') {
      const dialogOption = new MatDialogConfig();
      dialogOption.width = '400px';
      dialogOption.disableClose = true;
      const dialogRef = this.dialog.open(LoginComponent, dialogOption);
      dialogRef.afterClosed().subscribe(result => setTimeout(() => this.connectionS.setToken(result), 0));
      return;
    }
    this.tokenReady = true;
  }

}
