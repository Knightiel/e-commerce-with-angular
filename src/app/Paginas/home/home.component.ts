import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/Login/login.service';
import { LoginResponse } from '../../Interfaces/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // name = 'Gabriel';
  _fb = inject(FormBuilder)
  loginService = inject(LoginService)
  resposta: LoginResponse | undefined
  isLoading: boolean = false;
  router = inject(Router);

  form = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  logar(){
    this.isLoading=true;
    this.loginService.logar(
      this.form.controls.username.value!,
      this.form.controls.password.value!  //Mostra os dados do perfil
    ).subscribe({
      next: (val : LoginResponse) => {
        this.isLoading = false;
        this.resposta = val;
        this.router.navigate(['/products']);
      }
    })
    // const dadosUsername = this.form.controls.username.value!;
    // const dadosPassword = this.form.controls.username.value!;
  }

  // entra(){
  //   localStorage.clear();
  //   this.router.navigate(['products']);
  // }
}
