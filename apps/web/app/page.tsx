import EarningsCard from './_components/earnings-card';
import ProfileCard from './_components/profile-card';
import TemplateCard from './_components/template-card';
import { getData } from './data';

export default async function Home() {
  const data = await getData();

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
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
