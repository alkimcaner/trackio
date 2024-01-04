import { ReactNode } from "react";

export default function ResponsiveGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}
