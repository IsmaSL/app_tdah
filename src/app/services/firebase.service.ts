import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private storage: Storage) {}

    getProfileUrl(idPaciente: string): Promise<string> {
        const filePath = `storage/media/profile/${idPaciente}.jpg`;
        const storageRef = ref(this.storage, filePath);
    
        return getDownloadURL(storageRef);
    }
}