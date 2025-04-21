import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular'
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
@NgModule({
  imports: [
    NativeScriptCommonModule,
    AuthRoutingModule,
  ],
  declarations: [
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule { }