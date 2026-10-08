import { Component, inject, signal } from "@angular/core";
import { SafeAreaProvider } from "@ng-native/components";
import { NativeStackOutlet } from "@ng-native/router";

/**
 * Element names are lowercase, and that is load-bearing rather than style: an uppercase name is
 * read as an unknown Angular component and commits as a plain view with nothing in it.
 */
@Component({
  imports: [SafeAreaProvider, NativeStackOutlet],
  selector: "app-root",
  template: `
    <safe-area-provider>
      <native-stack-outlet />
    </safe-area-provider>
  `,
  styles: `
    :host {
      flex: 1;
    }
  `,
})
export class App {}
