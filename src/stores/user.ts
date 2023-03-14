import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  Unsubscribe,
  Auth,
  signInWithPopup,
  GithubAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { create } from "zustand";

export type User = {
  token?: string;
};

export interface UserState extends User {
  firebase?: {
    closer: Unsubscribe;
    auth: Auth;
    app: FirebaseApp;
  };
  initAndListen: () => Promise<void>;
  signin: (appVerifier?: RecaptchaVerifier) => Promise<void>;
  close: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: {},
  initAndListen: async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const closer = auth.onIdTokenChanged(async (user) => {
      if (!user) {
        return;
      }
      const token = await user.getIdToken();
      set({
        token,
      });
    });

    set({
      firebase: {
        app,
        auth,
        closer,
      },
    });
  },
  close: () => get().firebase?.closer(),
  signin: async (appVerifier?: RecaptchaVerifier) => {
    if (!appVerifier) {
      console.error(`not recaptcha verifier provided`);
      return;
    }
    const { firebase } = get();
    if (!firebase) {
      console.error(`firebase not initialized`);
      return;
    }
    await signInWithPopup(firebase.auth, new GithubAuthProvider()).then(
      async (result) => {
        const user = result.user;

        set({
          token: await user.getIdToken(),
        });
      }
    );
  },
}));

const firebaseConfig = {
  apiKey: "TODO:",
  authDomain: "TODO:",
  projectId: "TODO:",
  storageBucket: "TODO:",
  messagingSenderId: "TODO:",
  appId: "TODO:",
};
