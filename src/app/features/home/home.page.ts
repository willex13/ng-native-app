import { Component, signal } from "@angular/core";
import {
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Text,
} from "@ng-native/components";

@Component({
  selector: "app-home",
  template: `
    <safe-area-view [edges]="['top']">
      <view class="form">
        <text-input
          [placeholderTextColor]="'#809CFF'"
          placeholder="Email"
          [keyboardType]="'email-address'"
        />
        <text-input
          [placeholderTextColor]="'#809CFF'"
          placeholder="Password"
          [secureTextEntry]="true"
        />
        <view>
          <pressable
            #p="pressable"
            [style.opacity]="p.pressed() ? 0.6 : 1"
            [accessibilityRole]="'button'"
            class="btn-login"
          >
            <text>Login</text>
          </pressable>
         
        </view>
      </view>
    </safe-area-view>
  `,
  styles: `
    .form {
      min-height: 100vh;
      justify-content: center;
    }

    .btn-login {
      width: 12.9375rem;
      height: 2.8125rem;
      border-width: 0.0625rem;
      border-radius: 1.875rem;
      text-align: center;
      align-self: center;
      justify-content: center;
      border-color: #2260FF;
      background-color: #2260FF;
      color: #FFFFFF;
      text-transform: capitalize;
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
  imports: [SafeAreaView, View, TextInput, Pressable, Text],
})
export class HomePage {
  protected readonly email = signal("wilsonvarela@teste.com");
}
