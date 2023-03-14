import { Link as CLink, LinkProps as CLinkProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { Link as RLink, LinkProps as RLinkProps } from "react-router-dom";

export type LinkProps = CLinkProps &
  Omit<RLinkProps, "to"> & {
    /**
     * If specified use react-router link, this is for internal routing.
     *
     * If you need to link to external, please use `href` and `isExternal` props.
     */
    to?: string;
  };

export const Link = forwardRef<any, LinkProps>(
  ({ to, ...props }: LinkProps, ref) => {
    if (to) {
      if (props.isExternal) {
        throw new Error(`can not use "isExternal" with "to" props`);
      }

      if (props.href) {
        throw new Error(`can not use "href" with "to" props`);
      }

      return <CLink {...props} as={RLink} to={to} ref={ref} />;
    }

    return <CLink {...props} ref={ref} />;
  }
);
