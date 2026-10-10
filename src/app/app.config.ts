import { provideNativeRouter } from "@ng-native/router";
import { routes } from "./app.route";
import { provideNativeHttpClient } from "@ng-native/platform/http";
import { initializeApp } from "firebase/app";
import {
  PreloadAllModules,
  withComponentInputBinding,
  withPreloading,
} from "@angular/router";
import { FIREBASE_APP } from "../firebase.token";

// Your web app's Firebase configuration
const firebaseConfig = {
 
};
const app = initializeApp(firebaseConfig);

export const appConfig = {
  providers: [
    provideNativeRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideNativeHttpClient(),
    {
      provide: FIREBASE_APP,
      useFactory: () => {
        // This function runs once when the app starts.
        // It returns the native Firebase app instance.
        return initializeApp(firebaseConfig);
      },
    },
  ],
};
