import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LeftSidebar from '@/components/shared/LeftSidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fesnuk - Social Redefined',
  description: 'The elegant and powerful social media platform from Indonesia',
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>
//         <LeftSidebar />
//         {children}
//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen bg-black">
          <LeftSidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}