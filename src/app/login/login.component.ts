import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginform = true;
    recoverform = false;

    constructor() {
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
}
