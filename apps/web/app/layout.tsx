import './global.css';

import { cn } from '@nxnext/utils';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-background font-sans antialiased dark', fontSans.variable)}
      >
        {children}

        {process.env.NODE_ENV === 'production' && process.env.CLOUDFLARE_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          ></script>
        )}
      </body>
    </html>
  );
}
