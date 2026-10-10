import { Component, inject, signal } from "@angular/core";
import {
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Text,
  Image,
} from "@ng-native/components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginData } from "./models/login.data";
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
} from "@angular/forms/signals";
import { FirebaseApp } from "firebase/app";
import { FIREBASE_APP } from "../../../firebase.token";

@Component({
  selector: "app-home",
  imports: [SafeAreaView, View, TextInput, Pressable, Text, Image, FormField],
  template: `
    <safe-area-view [edges]="['top']">
      <view class="form">
        <image class="logo" [source]="logo" />
        <text-input
          [placeholderTextColor]="'#809CFF'"
          placeholder="Email"
          [keyboardType]="'email-address'"
          [formField]="f.email"
        />
        @if (f.email().touched() && f.email().invalid()) {
          @for (error of f.email().errors(); track error) {
            <text accessibilityRole="alert">{{ error.message }}</text>
          }
        }
        <text-input
          [placeholderTextColor]="'#809CFF'"
          placeholder="Password"
          [secureTextEntry]="true"
          [formField]="f.password"
          ,
        />
        @if (f.password().touched() && f.password().invalid()) {
          @for (error of f.password().errors(); track error) {
            <text accessibilityRole="alert">{{ error.message }}</text>
          }
        }
        <view>
          <pressable
            #lgIn="pressable"
            [style.opacity]="lgIn.pressed() ? 0.6 : 1"
            [accessibilityRole]="'button'"
            class="btn-login"
            [disabled]="f().submitting()"
            (press)="onSubmit()"
          >
            <text>{{ f().submitting() ? "Login..." : "Login" }}</text>
          </pressable>
          <pressable
            #res="pressable"
            [style.opacity]="res.pressed() ? 0.6 : 1"
            [accessibilityRole]="'button'"
            class="btn-register"
          >
            <text>Register</text>
          </pressable>

          @switch (status()) {
            @case ("success") {
              <text>You're signed up.</text>
            }
            @case ("error") {
              <text accessibilityRole="alert"
                >Fix the errors above, then try again.</text
              >
            }
          }
        </view>
      </view>
    </safe-area-view>
  `,
  styles: `
    .logo {
      margin-bottom: 90px;
      height: 15.6875rem;
      width: 9.125rem;
      align-self: center;
    }

    .form {
      min-height: 100vh;
      justify-content: center;
    }

    .btn-login {
      width: 12.9375rem;
      height: 2.8125rem;
      border-width: 0.0625rem;
      border-radius: 1.875rem;
      margin-bottom: 0.8125rem;
      text-align: center;
      align-self: center;
      justify-content: center;
      text-transform: capitalize;
      border-color: #2260ff;
      background-color: #2260ff;
      color: #ffffff;
    }

    .btn-register {
      width: 12.9375rem;
      height: 2.8125rem;
      border-width: 0.0625rem;
      border-radius: 1.875rem;
      text-align: center;
      align-self: center;
      justify-content: center;
      text-transform: capitalize;
      background-color: #cad6ff;
      border-color: #2260ff;
      color: #2260ff;
    }

    text-input {
      align-self: center;
      border-width: 0.0625rem;
      margin-bottom: 1.25rem;
      border-radius: 0.8125rem;
      width: 18.6875rem;
      height: 2.8125rem;
      border-color: #ecf1ff;
      background-color: #ecf1ff;
      color: #809cff;
    }
  `,
})
export class LoginPage {
  private firebaseApp = inject(FIREBASE_APP);
  protected readonly logo = require("../../../../assets/icon_medical.png");
  private readonly auth = getAuth(this.firebaseApp);
  protected readonly status = signal<"idle" | "success" | "error">("idle");
  protected loginModel = signal<LoginData>({
    email: "",
    password: "",
  });


  protected f = form(this.loginModel, (path) => {
    required(path.email);
    email(path.email);
    minLength(path.password, 6);
    required(path.password);
  });

  protected async onSubmit(): Promise<void> {
    await submit(this.f, {
      action: async (field) => {
        const { email, password } = field().value();
        signInWithEmailAndPassword(this.auth, email, password).then((resp) => {
          if (resp.user) {
            this.status.set("success");
            return;
          }
        }).catch((error) => {
          this.status.set("error")
        });
      },
      onInvalid: () => this.status.set("error"),
    });
  }
}
