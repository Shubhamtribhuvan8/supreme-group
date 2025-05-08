'use client';

import { useRouter } from 'next/navigation';
import NoPageFound from '../app/NoPageFound';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (!['/', '/home'].includes(path)) {
    return <NoPageFound />;
  }

  return <>{children}</>;
}
