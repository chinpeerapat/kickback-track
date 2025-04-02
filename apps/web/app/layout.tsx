import './global.css';

import { cn } from '@nxnext/utils';
import { Inter as FontSans } from 'next/font/google';
import Script from 'next/script';

import { env } from './_env';

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

        {env.NODE_ENV === 'production' && env.CLOUDFLARE_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${env.CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          ></script>
        )}
      </body>

      {env.NODE_ENV === 'development' && env.ONEDOLLARSTATS_ENABLED && (
        <Script src="https://assets.onedollarstats.com/stonks.js" />
      )}
    </html>
  );
}
