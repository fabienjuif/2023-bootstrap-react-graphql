import { Button, ButtonProps } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export interface LoadingButtonProps extends ButtonProps {
  defaultLoading?: boolean;
  onClick: () => Promise<unknown>;
}

export function LoadingButton({
  defaultLoading,
  onClick,
  ...props
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(defaultLoading ?? false);
  const _onClick = useCallback(async () => {
    setIsLoading(true);
    try {
      onClick();
    } finally {
      setIsLoading(false);
    }
  }, [onClick]);

  return <Button {...props} isLoading={isLoading} onClick={_onClick}></Button>;
}
