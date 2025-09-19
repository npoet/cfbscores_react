// components/TeamLogo.js
import Image from "next/image";
import { useState } from "react";

export default function TeamLogo({ src, alt, size = 42 }) {
  const [imgSrc, setImgSrc] = useState(src || "/helmet.png");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      onError={() => setImgSrc("/helmet.png")}
      unoptimized // allows the native <img> error handling
    />
  );
}
