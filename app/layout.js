import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: { default: 'ARKIS — AI, Redefined', template: '%s | ARKIS' },
  description: 'ARKIS builds next-generation local AI assistants. Voice AI, image generation, video AI — all on your machine.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
