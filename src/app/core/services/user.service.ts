import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private firebaseService = inject(FirebaseService);
    userCollection;

    constructor(){
        console.log('User service initialized');
        // this.userCollection = firestore().collection('users');

        // console.log(this.userCollection);
    }

    getUsers(){
        // this.firebaseService.getFirestore()
        // .collection('users')
        // .onSnapshot(
        //     (snapshot) => {
        //         console.log('Got Users collection result.');
        //         console.log(snapshot.docs.map((doc) => doc.data()));
        //     },
        //     (error) => {
        //         console.error(error);
        //     }
        // );
    }
};
