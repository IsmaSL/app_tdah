import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = 'http://localhost:8000/auth/login';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
      
        return this.http.post<any>(this.loginUrl, body.toString(), options);
    }

    logout() {
        // Eliminar el token del almacenamiento
        localStorage.removeItem('token'); // o cómo estés manejando el token
        localStorage.removeItem('current_user');
        // Limpiar cualquier otro estado relacionado con la autenticación
    }

    getUserProfile() {
        return this.http.get('http://localhost:8000/auth/get-current-user');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setUser(user: any) {
        localStorage.setItem('current_user', JSON.stringify(user))
    }
}