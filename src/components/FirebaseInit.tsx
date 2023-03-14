import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "../stores";

export interface FirebaseInitProps {
  children: ReactNode;
  onToken?: (token?: string) => void;
}

export function FirebaseInit({ children, onToken }: FirebaseInitProps) {
  const [isInit, setIsInit] = useState(false);
  const userStore = useUserStore();
  useEffect(() => {
    userStore.initAndListen().then(() => {
      setIsInit(true);
    });

    return userStore.close();
  }, []);

  useEffect(() => {
    onToken?.(userStore.token);
  }, [userStore.token]);

  if (isInit) {
    return <>{children}</>;
  }
  return null;
}
