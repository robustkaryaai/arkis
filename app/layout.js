import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/context/AuthContext';
import ScrollObserver from '@/components/ScrollObserver';

export const metadata = {
  title: { default: 'Rexycore — AI, Redefined', template: '%s | Rexycore' },
  description: 'Rexycore builds next-generation local AI assistants. Voice AI, image generation, video AI — all on your machine.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ScrollObserver />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
