import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ConnectionService } from '../../_services/connection.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<LoginComponent>,
    private connectionS: ConnectionService) {
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

