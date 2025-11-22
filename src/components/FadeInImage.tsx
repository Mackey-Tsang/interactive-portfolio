"use client";

import React, { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type FadeInImageProps = HTMLMotionProps<"img">;

export default function FadeInImage({
  onLoad,
  onError,
  ...rest
}: FadeInImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.img
      {...rest}
      initial={{ opacity: 0, y: 12 }}
      animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        // still reveal even if image fails
        setLoaded(true);
        onError?.(e);
      }}
    />
  );
}
