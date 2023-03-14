import { Button, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalesProvider, useLocales } from "use-locales";
import {
  GetRecaptchaVerifierRef,
  Recaptcha,
  useVersion,
  FirebaseInit,
  GraphQLProvider,
  Signin,
} from "./components";
import { Home } from "./screens";
import { useUserStore } from "./stores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/matchings",
    lazy: async () => {
      const { Matchings } = await import("./screens/Matchings");
      return { Component: Matchings };
    },
  },
]);

export const theme = extendTheme({
  components: {
    Link: {
      variants: {
        asButton: {
          textDecoration: "none",
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export function App() {
  const version = useVersion();

  // signin (should be moved)
  const userStore = useUserStore();
  const appVerifier = useRef<GetRecaptchaVerifierRef>(null);
  const onSignin = useCallback(
    () => userStore.signin(appVerifier.current?.get()),
    []
  );

  // proof of concept (token)
  useEffect(() => {
    if (userStore.token) {
      console.log("token", userStore.token);
    }
  }, [userStore.token]);

  return (
    <ChakraProvider theme={theme}>
      <LocalesProvider hashKey={version ?? new Date()}>
        <GraphQLProvider>
          {(setToken) => (
            /* TODO: If you want firebase auth yo uhave to init it in stores/user.ts */
            /*      You can then uncomment this line and Signin button and Recaptcha */
            // <FirebaseInit onToken={setToken}>
            <>
              {/* <Signin onClick={onSignin} messages={useLocales("root")} /> */}
              {/* <Recaptcha ref={appVerifier} /> */}

              <RouterProvider router={router} />
            </>
            // </FirebaseInit>
          )}
        </GraphQLProvider>
      </LocalesProvider>
    </ChakraProvider>
  );
}
