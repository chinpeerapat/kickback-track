import { ImageResponse } from 'next/og';

import { getCachedData } from '../data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getCachedData();

  const totalEarnings = data.userTemplates.reduce((acc, template) => acc + template.totalPayout, 0);
  const totalDownloads = data.userTemplates.reduce((acc, template) => acc + template.projects, 0);

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
        tw="p-8"
      >
        <div tw="flex flex-col w-full px-4 items-center justify-between">
          <div tw="flex flex-row mt-12 items-center">
            <img
              src={data.railwayProfile.avatar}
              alt="User Avatar"
              tw="my-8 rounded-full border border-gray-300 w-[15%]"
            />

            <h2 tw="font-medium text-7xl text-gray-700 ml-4">{data.railwayProfile.name}</h2>
          </div>

          <div tw="flex w-full justify-between">
            Total Earnings:{' '}
            <span tw="text-blue-700 text-5xl">
              {totalEarnings.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            Total Deploys:{' '}
            <span tw="text-blue-700 text-5xl">{totalDownloads.toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
