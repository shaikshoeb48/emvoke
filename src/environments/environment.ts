// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // production: false,
  // baseUrl: 'http://13.234.212.60:8000/',
  // baseParameter: 'lookplush-clinic',
  // customerID: '3ac0270f-585f-4f89-b6cb-03254561045d',
  // razoypayId: 'rzp_test_OsC744Kj2baKzp',
  // paymentUrl: 'http://13.235.117.26:8000',
  // USERNAME: process.env.USERNAME

  production: false,
  baseUrl : 'http://13.234.212.60:8000/',
  baseParameter: 'lookplush-clinic',
  customerID: '3ac0270f-585f-4f89-b6cb-03254561045d',
  razoypayId: 'rzp_test_OsC744Kj2baKzp',
  paymentUrl: 'http://13.235.117.26:8000',
  snomedUrl : 'http://13.126.132.1/',
  billingUrl: 'http://65.0.71.103:8000/billing/',
  sseUrl : 'https://api.lookplush.com:20443/',
  reportsUrl : 'https://api.fitplush.com:20449/saas/doctor/'
  // USERNAME: process.env.USERNAME
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
