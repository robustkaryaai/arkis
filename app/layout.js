import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: { default: 'RK AI — AI, Redefined', template: '%s | RK AI' },
  description: 'RK AI builds next-generation local AI assistants. Voice AI, image generation, video AI — all on your machine.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
