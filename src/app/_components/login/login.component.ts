import { ConnectionService } from '../../_services/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;


  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginComponent>, private connectionS: ConnectionService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public close(): void {
    this.connectionS.askToken(this.form.value.name, this.form.value.password).subscribe(answer => {
      this.dialogRef.close(answer.token);
    });
  }
}

