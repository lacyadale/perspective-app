import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ADHDIndex from '../../../apps/adhd-tools/pages/index';

export default function ADHDToolsRoute() {
  const router = useRouter();
  const { slug } = router.query;
  
  // If no slug, show the main ADHD tools page
  if (!slug || slug.length === 0) {
    return <ADHDIndex />;
  }
  
  // Handle dynamic routes for future ADHD tools
  const currentPath = Array.isArray(slug) ? slug.join('/') : slug;
  
  // For now, redirect unknown paths to main ADHD page
  // Later you can add specific tool routing here
  useEffect(() => {
    if (currentPath !== '') {
      router.push('/adhd');
    }
  }, [currentPath, router]);
  
  return <ADHDIndex />;
}