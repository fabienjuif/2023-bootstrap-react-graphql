import { ReactNode, useCallback, useState } from "react";
import { createClient, Provider } from "urql";

const DEFAULT_OPTIONS = {
  url: "/query",
};

export interface GraphQLProviderProps {
  children: (setToken: (token?: string) => void) => ReactNode;
}

export const GraphQLProvider = ({ children }: GraphQLProviderProps) => {
  const [client, setClient] = useState(createClient(DEFAULT_OPTIONS));

  const setToken = useCallback((token?: string) => {
    setClient(
      createClient({
        ...DEFAULT_OPTIONS,
        fetchOptions: () => ({
          headers: { authorization: token ? `Bearer ${token}` : "" },
        }),
      })
    );
  }, []);

  return <Provider value={client}>{children(setToken)}</Provider>;
};
