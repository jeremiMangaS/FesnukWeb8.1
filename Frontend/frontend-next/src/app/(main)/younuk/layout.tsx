import React from 'react';
import LeftSidebar from '@/components/shared/LeftSidebar';
import NavbarYounuk from '@/components/shared/NavbarYounuk';
import '@/app/(main)/globals.css';

export default function YounukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <LeftSidebar />

      <NavbarYounuk />

      <main className="ml-64 pt-16">
        {children}
      </main>
    </div>
  );
}