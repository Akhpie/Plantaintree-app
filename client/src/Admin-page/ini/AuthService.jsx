import { gapi } from "gapi-script";

let isGapiInitialized = false; // Track initialization state

export const initGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    // Check if GAPI is already initialized
    if (isGapiInitialized) {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        resolve(authInstance.currentUser.get().getAuthResponse());
      } else {
        authInstance.signIn().then(
          (googleUser) => {
            resolve(googleUser.getAuthResponse());
          },
          (error) => {
            reject(error);
          }
        );
      }
      return; // Exit early if already initialized
    }

    // Load GAPI and initialize
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId:
            "297028572945-r9nejlf0lsf7pssqmtv0huts1bn8jtac.apps.googleusercontent.com",
          scope:
            "email profile openid https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar.events",
        })
        .then(() => {
          isGapiInitialized = true; // Set initialization state
          const authInstance = gapi.auth2.getAuthInstance();

          if (authInstance.isSignedIn.get()) {
            resolve(authInstance.currentUser.get().getAuthResponse());
          } else {
            authInstance.signIn().then(
              (googleUser) => {
                resolve(googleUser.getAuthResponse());
              },
              (error) => {
                reject(error);
              }
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const getAccessToken = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.currentUser.get().getAuthResponse().access_token;
};

export const getIdToken = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.currentUser.get().getAuthResponse().id_token;
};
