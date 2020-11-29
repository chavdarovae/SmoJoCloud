// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const applicationId = 'D5B2B971-C14A-548A-FF57-6688231F8D00';
const RESTApiKey = '09493139-2050-470E-8BD2-83D7D7097D09';

export const environment = {
  production: false,
  apiUrl: `https://api.backendless.com/${applicationId}/${RESTApiKey}`
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
