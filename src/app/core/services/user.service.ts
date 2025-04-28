import { firestore } from '@nativescript/firebase/app';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userCollection;

    constructor(){
        this.userCollection = firestore().collection('users');

        console.log('User service initialized');
        console.log(this.userCollection);
    }

    getUsers(){

    }
};
