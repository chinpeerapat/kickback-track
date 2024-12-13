import EarningsCard from './_components/earnings-card';
import ProfileCard from './_components/profile-card';
import StatsOverview from './_components/stats-overview';
import TemplateCard from './_components/template-card';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-6 md:grid-cols-[1fr,2fr]">
          <ProfileCard />
          <StatsOverview />
        </div>

        <div className="grid gap-6">
          <EarningsCard />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              title="PostgreSQL + Redis Stack"
              description="High-performance database setup with PostgreSQL and Redis"
              downloads={1234}
              price={29.99}
              image="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80"
            />
            <TemplateCard
              title="Node.js Microservices"
              description="Scalable microservices architecture with Node.js"
              downloads={892}
              price={39.99}
              image="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=80"
            />
            <TemplateCard
              title="Django + Celery"
              description="Production Django setup with background tasks"
              downloads={567}
              price={24.99}
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
