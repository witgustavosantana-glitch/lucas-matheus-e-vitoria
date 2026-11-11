import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add Google Drive scopes required for reading files and streaming
provider.addScope("https://www.googleapis.com/auth/drive.readonly");
provider.addScope("https://www.googleapis.com/auth/drive.metadata.readonly");

/**
 * Initiates standard Google login using Firebase Popup and returns the Google OAuth access token.
 */
export const loginWithGoogleDrive = async (): Promise<string> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    if (!token) {
      throw new Error("Não foi possível obter o token de acesso da sua conta Google.");
    }
    return token;
  } catch (error: any) {
    console.error("Google Drive sign in error:", error);
    throw error;
  }
};

/**
 * Signs the user out of Firebase Auth.
 */
export const logoutGoogleDrive = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};
