import { Injectable } from "@angular/core";
import { Profile } from "../models/profile"; // Adjusted the path to the correct location
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "@angular/fire/auth"; // Import Auth from Firebase

@Injectable({
    providedIn: 'root'
})
export class FireAuthService {
    isLoggedIn = false;
    get IsLoggedIn() { return this.isLoggedIn; }
    user?: Profile;
    userRole?: string = "";
  
    constructor(private auth: Auth) {
      this.LoadSession();
    }
  
    async Signup(user: Profile, password: string) {
      try {
        const res = await createUserWithEmailAndPassword(this.auth, user.email, password);
        if (res.user.email !== null && res.user.uid !== null) {
          this.user = user;
          this.user.id = res.user.uid;
          this.isLoggedIn = true;
  
          await sendEmailVerification(res.user);
          console.log("Email de verificacion enviado");
        }
        else{
          throw new Error("Error al crear usuario");
        }
      } catch (e: any) {
        const errorMessage = ""
        switch (e.code) {
          case "auth/invalid-email":
            let errorMessage = "Email invalido";
            break;
          case "auth/email-already-in-use":
            errorMessage = "Email ya en uso";
            break;
          case "auth/invalid-credential":
            errorMessage = "Credenciales invalidas";
            break;
          default:
            errorMessage = e.code
            break;
        }
        throw new Error(errorMessage);
      }
    }
  
    async DeleteUser() {
      try {
        if (this.user) {
          await this.auth.currentUser?.delete();
          this.isLoggedIn = false;
          this.user = undefined;
          this.userRole = undefined;
          this.ClearSession();
        }
      } catch (e) {
        throw e;
      }
    }
  
    async Login(email: string, password: string): Promise<any> {
      try {
        const credentials = await signInWithEmailAndPassword(this.auth, email, password);
        return credentials.user;
      } catch (error) {
        throw error;
      }
    }
  
    async Logout() {
      try {
        await this.auth.signOut();
        this.isLoggedIn = false;
        this.user = undefined;
        this.userRole = undefined;
        this.ClearSession();
      } catch (e) {
        throw e;
      }
    }
  
    async SendVerificationEmail() {
      try {
        console.log("Enviando email de verificacion");
        if (this.auth.currentUser) {
          await sendEmailVerification(this.auth.currentUser);
          console.log("Email de verificacion enviado");
        }
        else console.log("No hay usuario logueado");
      } catch (e) {
        throw e;
      }
    }
    IsVerified() {
      return this.auth.currentUser?.emailVerified;
    }
    IsEspecialista(): boolean {
      return this.userRole === "especialista";
    }
    IsPaciente() {
      return this.userRole === "paciente";
    }
    IsAdmin(): boolean {
      return this.userRole === "admin";
    }
  
    private LoadSession(){
      const sessionData = localStorage.getItem("session");
      if(sessionData){
        const session = JSON.parse(sessionData);
        const currentTime = new Date().getTime();
        const sessionDuration = 60 * 60 * 1000; // 60 minutos
  
        // si la sesion no expiro
        if(currentTime - session.timestamp < sessionDuration){
          this.isLoggedIn = session.isLoggedIn;
          this.user = session.user;
          this.userRole = session.userRole;
        }
        else {
          this.ClearSession();
        }
      }
    }
  
    SaveSession(){
      const sessionData = {
        user: this.user,
        userRole: this.userRole,
        isLoggedIn: this.isLoggedIn,
        timestamp: new Date().getTime()
      };
  
      localStorage.setItem("session", JSON.stringify(sessionData));
      console.log("Session guardada", sessionData);
    }
  
    private ClearSession(){
      localStorage.removeItem("session");
    }
  }