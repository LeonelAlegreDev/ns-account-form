import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent,
  ],
  providers: [

  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule { }