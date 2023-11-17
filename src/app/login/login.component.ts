import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginform = true;
    recoverform = false;

    credentials = { username: '', password: '' };

    constructor(private router: Router, private authService: AuthService) {
        this.setUserInfo();
        // this.getUserInfo();
    }

    showRecoverForm() {
        this.loginform = !this.loginform;
        this.recoverform = !this.recoverform;
    }

    setUserInfo() {
        let nombre: string = "Ismael";
        let usuario: any = {
            nombre: "Ismael",
            edad: 25,
            credenciales: {
                user: "IsmaelSL",
                pass: "holamundo"
            }
        }

        let listTest: any[] = [];

        localStorage.setItem("userName", nombre);
        localStorage.setItem("userData", JSON.stringify(usuario));
        localStorage.setItem("listTest", JSON.stringify(listTest));
    }

    getUserInfo() {
        const nombre = localStorage.getItem("userName");
        const usuario = JSON.parse(localStorage.getItem("userData"));

        console.log(nombre + "\n" + usuario);
        console.log(typeof usuario)

        const datosGuardados = localStorage.getItem('userData');
        if (datosGuardados) {
            const datosUsuario = JSON.parse(datosGuardados);
            console.log(datosUsuario); // Esto imprimirá el objeto en la consola de forma legible
        }
    }

    login() {
        this.authService.login(this.credentials.username, this.credentials.password).subscribe(response => {
            // Almacena el token
            this.authService.setToken(response.access_token);
            
            this.getCurrentUser();
            // Procesa la respuesta, guarda el token, navega a otra página, etc.
            this.router.navigate(['/app/home']);
        }, error => {
            console.log("status: " + error.status + " - " + error.statusText + "\n" + error.error.message);
            alert("Ups... " + error.error.message)
        });
    }

    getCurrentUser() {
        this.authService.getUserProfile().subscribe(
            response => {
                console.log(response);
                this.authService.setUser(response);
            }, error => {
                console.log(error);
                alert("Ups... " + error)
            }
        )
    }
}
