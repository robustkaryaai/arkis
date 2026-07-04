import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: { default: 'Rexycore — AI, Redefined', template: '%s | Rexycore' },
  description: 'Rexycore builds next-generation local AI assistants. Voice AI, image generation, video AI — all on your machine.',
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
