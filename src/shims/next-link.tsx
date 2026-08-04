import React from "react";

const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((
  { href, children, ...props },
  ref
) => {
  return (
    <a href={href} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";

export default Link;
