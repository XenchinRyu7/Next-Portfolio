import React, { useEffect, useState } from "react";

export default function dynamic<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T } | T>,
  options?: { loading?: () => React.ReactElement | null; ssr?: boolean }
) {
  return function DynamicComponent(props: React.ComponentProps<T>) {
    const [Component, setComponent] = useState<T | null>(null);

    useEffect(() => {
      importFunc().then((mod) => {
        setComponent(() => ("default" in mod ? mod.default : mod));
      });
    }, []);

    if (!Component) {
      return options?.loading ? options.loading() : null;
    }

    return <Component {...props} />;
  };
}
