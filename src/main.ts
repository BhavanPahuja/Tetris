import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppComponent } from '@angular-tetris/app.component';
import { environment } from './environments/environment';

const initSentry = () => {
  // Sentry configuration removed - configure with your own DSN if needed
  // Sentry.init({
  //   dsn: 'YOUR_SENTRY_DSN_HERE',
  //   autoSessionTracking: true,
  //   integrations: [
  //     new Integrations.BrowserTracing({
  //       tracingOrigins: ['localhost'],
  //       routingInstrumentation: Sentry.routingInstrumentation
  //     })
  //   ],
  //   tracesSampleRate: 1.0
  // });
};

if (environment.production) {
  enableProdMode();
  // initSentry(); // Uncomment and configure Sentry if needed
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AkitaNgDevtools.forRoot()),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler()
    }
  ]
});
