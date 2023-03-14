import { Center, CenterProps, Image } from "@chakra-ui/react";
import logo from "./Logo.svg";

export enum LogoSize {
  S = "0.8em",
  M = "1em",
  L = "1.2em",
}

export interface LogoProps extends CenterProps {
  size?: LogoSize;
}

export function Logo({ size = LogoSize.M, ...props }: LogoProps) {
  return (
    <Center {...props} fontSize={size}>
      <Image src={logo} width="10em" />
    </Center>
  );
}
