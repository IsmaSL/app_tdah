// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    firebaseConfig: {
        apiKey: "AIzaSyA9-Bi6C-5AYfWgD9ThMU2z68PsBtmYyvg",
        authDomain: "tdah-app-7c3f4.firebaseapp.com",
        projectId: "tdah-app-7c3f4",
        storageBucket: "tdah-app-7c3f4.appspot.com",
        messagingSenderId: "271268485604",
        appId: "1:271268485604:web:a772c5bee6be1fe5bb4ff1"
    },
    apiBaseUrl: 'http://localhost:8000'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
