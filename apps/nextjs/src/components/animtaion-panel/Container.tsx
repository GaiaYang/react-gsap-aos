import React from "react";

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
  );
}
