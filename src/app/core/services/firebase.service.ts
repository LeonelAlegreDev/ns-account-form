import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import { Firestore } from '@nativescript/firebase-firestore';
import '@nativescript/firebase-firestore';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService{
    private firestore: Firestore;

    constructor() {
        this.initializeFirebase();
    }

    private initializeFirebase() {
        this.firestore = firebase().firestore();
    }

    getFirestore() {
        return this.firestore;
    }
}