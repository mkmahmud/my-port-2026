'use client';

import { useState } from 'react';
import Image from 'next/image';

/** A project screenshot that falls back to a branded panel when the file is missing. */
export function SafeShot({ src, alt, title, sizes, priority = false }: { src?: string; alt: string; title: string; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(!src);
  if (failed || !src) {
    return (
      <div className="shot-missing">
        <span>{title.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('')}</span>
        <small>Preview coming soon</small>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      loading={priority ? undefined : 'lazy'}
      unoptimized={src.endsWith('.svg')}
      onError={() => setFailed(true)}
    />
  );
}
