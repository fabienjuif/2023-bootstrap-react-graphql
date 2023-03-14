import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useUserStore } from "../stores";
import { LoadingButton } from "./LoadingButton";

export interface SigninProps {
  messages: {
    signin: string;
  };
  onClick: () => Promise<unknown>;
}

export function Signin({ messages, onClick }: SigninProps) {
  const userStore = useUserStore();

  return (
    <LoadingButton onClick={onClick}>
      {userStore.token ? "TODO: avatar" : messages.signin}
    </LoadingButton>
  );
}
