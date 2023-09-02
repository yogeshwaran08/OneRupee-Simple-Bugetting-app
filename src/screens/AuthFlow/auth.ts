import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({webClientId : "343495104562-3pc8l0iu4vufs29fkdpfsmrr8v6qrg8e.apps.googleusercontent.com"})

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  console.log(idToken)

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return (await auth().signInWithCredential(googleCredential));
}


export const signUpWithEmail = (email : string, password : string,successCallback : () => void, failCallback : (e : any) => void) => {
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    successCallback()
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
        failCallback(error);
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
        failCallback(error);
      console.log('That email address is invalid!');
    }
    failCallback(error);
    console.error(error);
  });
}

export const loginWithEmail = (email : string, password : string, successCallback : () => void, failCallback : (e : any) => void) => {
    auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("success fully logged in")
        successCallback()
    }).catch((error) => {
        console.log(error);
        failCallback(error);
    })
}


export const logOut = () => {
    auth().signOut().then(() => console.log("signed out"));
}

export const resetPassword = (email : string) => {
  auth().sendPasswordResetEmail(email).then(() => {
    console.log("Reset password send")
  }).catch((error) => {
    console.log("error ",error)
  })
}
