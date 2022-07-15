import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private landaService: LandaService) { }

    getUsers(arrParameter) {
        return this.landaService.DataGet('/v1/users', arrParameter);
    }

    getUserById(userId) {
        return this.landaService.DataGet('/v1/users/' + userId);
    }

    createUser(payload) {
        return this.landaService.DataPost('/v1/users', payload);
    }

    updateUser(payload) {
        return this.landaService.DataPut('/v1/users', payload);
    }

    deleteUser(userId) {
        return this.landaService.DataDelete('/v1/users/' + userId);
    }


    getUProfile(arrParameter) {
        return this.landaService.DataGet('/v1/profile', {arrParameter});
    }

    getProfileById(userId) {
        return this.landaService.DataGet('/v1/profile/' + userId);
    }

    createProfile(payload) {
        return this.landaService.DataPost('/v1/profile', payload);
    }

    updateProfile(payload) {
        return this.landaService.DataPut('/v1/profile', payload);
    }

    deleteProfile(userId) {
        return this.landaService.DataDelete('/v1/profile/' + userId);
    }
}
