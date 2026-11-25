import { useState } from 'react';

const FALLBACK_SRC = '/images/placeholder.svg';

function SafeImage({ src, alt, ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = failedSrc === src;

  return (
    <img
      {...props}
      src={failed ? FALLBACK_SRC : src}
      alt={alt}
      onError={() => {
        if (!failed) setFailedSrc(src);
      }}
    />
  );
}

export default SafeImage;
