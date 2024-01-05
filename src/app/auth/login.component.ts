import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginform = true;
    recoverform = false;
    isChecking: boolean = false;

    credentials = { username: '', password: '' };

    constructor(private router: Router, 
                private authService: AuthService) {
                    if(this.authService.isLoggedIn()) {
                        this.router.navigate(['/app/home']);
                    }
                }

    showRecoverForm() {
        this.loginform = !this.loginform;
        this.recoverform = !this.recoverform;
    }

    login() {
        this.authService.login(this.credentials.username, this.credentials.password).subscribe(response => {
            this.isChecking = true;
            // Almacena el token
            this.authService.setToken(response.access_token);
            // Obtiene el usuario por el token
            this.getCurrentUser();
            // Prepara el cambio de página
            setTimeout(
                () => {
                    // Procesa la respuesta, guarda el token, navega a otra página, etc.
                    this.router.navigate(['/app/home']);
                }, 2000
            );
        }, error => {
            console.log("status: " + error.status + " - " + error.statusText + "\n" + error.error.message);
            alert("Error: Login -> " + error.error.message)
        });
    }

    async getCurrentUser() {
        await this.authService.getUserProfile().subscribe(
            response => {
                // Almacena el usuario
                this.authService.setUser(response);
            }, error => {
                console.log(error);
                alert("Error: Get.Info.User ->" + error.error.message)
            }
        )
    }
}
