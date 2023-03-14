import { RecaptchaVerifier } from "firebase/auth";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { useUserStore } from "../stores";

export interface GetRecaptchaVerifierRef {
  get: () => RecaptchaVerifier | undefined;
}

export const Recaptcha = forwardRef<GetRecaptchaVerifierRef>((props, ref) => {
  const userStore = useUserStore();
  const appVerifier = useRef<RecaptchaVerifier>();

  const initSignin = useCallback(() => {
    if (!userStore.firebase?.auth) {
      console.error(`firebase is not initialized`);
      return;
    }
    appVerifier.current?.clear();
    appVerifier.current = new RecaptchaVerifier(
      "Recaptcha",
      {
        size: "invisible",
        callback: () => {},
      },
      userStore.firebase?.auth
    );
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      get() {
        return appVerifier.current;
      },
    }),
    []
  );

  return (
    <div id="Recaptcha" ref={initSignin} style={{ visibility: "hidden" }} />
  );
});
