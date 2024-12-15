import { Metadata, Viewport } from 'next';

import EarningsCard from './_components/earnings-card';
import ProfileCard from './_components/profile-card';
import TemplateCard from './_components/template-card';
import { env } from './_env';
import { getCachedData } from './data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCachedData();

  return {
    title: `${data.railwayProfile.name} | Railway Kickback`,
    description: `Check out ${data.railwayProfile.name}'s templates on Railway`,
    authors: {
      name: 'Igor Katsuba',
      url: 'https://github.com/IKatsuba',
    },
    creator: 'Igor Katsuba',
    keywords: ['railway', 'templates', 'kickback', 'earnings', data.railwayProfile.name],
    alternates: {
      canonical: 'https://railway.katsuba.dev',
    },
    openGraph: {
      title: `${data.railwayProfile.name} | Railway Kickback`,
      description: `Check out ${data.railwayProfile.name}'s templates on Railway`,
      url: `https://${env.RAILWAY_PUBLIC_DOMAIN}`,
      siteName: 'Railway Kickback',
      type: 'website',
      ttl: 60 * 60 * 24,
      // images: [
      //   {
      //     url: `og`,
      //     width: 1200,
      //     height: 630,
      //     alt: `${data.railwayProfile.name} | Railway Kickback`,
      //   },
      // ],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: 'dark',
};

export default async function Home() {
  const data = await getCachedData();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-6 md:grid-cols-[1fr,2fr]">
          <ProfileCard {...data} />
          <EarningsCard {...data} />
        </div>

        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.userTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.name}
                description={template.description}
                downloads={template.projects}
                price={template.totalPayout}
                image={
                  template.image ??
                  `https://devicons.railway.app/${encodeURIComponent(template.name)}?variant=light`
                }
                code={template.code}
                referralCode={data.referralCode}
                activeProjects={template.activeProjects}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
