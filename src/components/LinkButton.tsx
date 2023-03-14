import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { LinkProps, Link } from "./Link";

export type LinkButtonProps = ButtonProps &
  Pick<LinkProps, "href" | "to" | "isExternal">;

export const LinkButton = forwardRef<any, LinkButtonProps>(
  (props: LinkButtonProps, ref) => {
    return <Button {...props} as={BLink} ref={ref} />;
  }
);

const BLink = forwardRef<any, LinkProps>((props: LinkProps, ref) => {
  return <Link {...props} variant="asButton" ref={ref} />;
});
