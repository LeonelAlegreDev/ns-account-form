// features/auth/auth.module.ts
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular'
import { AuthRoutingModule } from './auth-routing.module';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    AuthRoutingModule,
  ],
  declarations: [
    WelcomePageComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule { }