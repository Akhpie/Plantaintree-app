import { gapi } from "gapi-script";

let isGapiInitialized = false;

export const initGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    if (isGapiInitialized) {
      const authResponse = checkAuthStatus();
      if (authResponse) {
        resolve(authResponse);
      } else {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          resolve(authInstance.currentUser.get().getAuthResponse());
        } else {
          signInUser(authInstance, resolve, reject);
        }
      }
      return;
    }

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

          const authResponse = checkAuthStatus(); // Check local storage first
          if (authResponse) {
            resolve(authResponse);
          } else if (authInstance.isSignedIn.get()) {
            resolve(authInstance.currentUser.get().getAuthResponse());
          } else {
            signInUser(authInstance, resolve, reject);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const signInUser = (authInstance, resolve, reject) => {
  authInstance.signIn().then(
    (googleUser) => {
      const authResponse = googleUser.getAuthResponse();
      localStorage.setItem("googleAuth", JSON.stringify(authResponse));
      resolve(authResponse);
    },
    (error) => {
      reject(error);
    }
  );
};

export const getAccessToken = () => {
  const authResponse = JSON.parse(localStorage.getItem("googleAuth"));
  if (authResponse) {
    return authResponse.access_token;
  }
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.currentUser.get().getAuthResponse().access_token;
};

// Function to get ID token from local storage or GAPI
export const getIdToken = () => {
  const authResponse = JSON.parse(localStorage.getItem("googleAuth"));
  if (authResponse) {
    return authResponse.id_token;
  }
  const authInstance = gapi.auth2.getAuthInstance();
  return authInstance.currentUser.get().getAuthResponse().id_token;
};

// Check if user is signed in after page refresh
export const checkAuthStatus = () => {
  const authResponse = JSON.parse(localStorage.getItem("googleAuth"));
  if (authResponse) {
    return authResponse;
  }
  return null;
};
