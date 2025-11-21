import React from 'react';
import Link from 'next/link';
import { useProxyAwareLinks } from '../utils/linkHelpers';

/**
 * Drop-in replacement for Next.js Link component that works in both
 * direct and proxy environments
 */
export default function ProxyLink({ href, children, ...props }) {
  const { getHref } = useProxyAwareLinks();
  const adjustedHref = getHref(href);
  
  return (
    <Link href={adjustedHref} {...props}>
      {children}
    </Link>
  );
}
