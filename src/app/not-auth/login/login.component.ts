import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  pending = false;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(PATTERN.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(PATTERN.PASSWORD)]]
    });
  }

  login() {
    this.form.markAsDirty();
    if (this.form.valid) {
      this.pending = true;
      this.authService.login(this.form.value).pipe(take(1)).subscribe(_ => {}, _ => this.pending = false);
    }
  }

}
