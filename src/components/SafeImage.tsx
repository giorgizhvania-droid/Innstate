"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

export default function SafeImage(props: Omit<ImageProps, "onError">) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5 ${props.className ?? ""}`}
        style={{ position: props.fill ? "absolute" : undefined, inset: props.fill ? 0 : undefined }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-accent/40">
          <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </div>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setErrored(true)} />;
}
