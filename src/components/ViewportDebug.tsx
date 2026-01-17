"use client";

import { useEffect, useState } from "react";

export default function ViewportDebug() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-black text-white px-3 py-1 text-sm">
      width: {width}px
    </div>
  );
}
