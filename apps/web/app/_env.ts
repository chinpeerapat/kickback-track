import { z } from 'zod';

const envSchema = z.object({
  RAILWAY_TOKEN: z.string({
    message:
      'Looks like your Railway token is missing. Please add it to your environment as RAILWAY_TOKEN.',
  }),
  RAILWAY_PUBLIC_DOMAIN: z.string().optional(),
  CLOUDFLARE_ANALYTICS_TOKEN: z.string().optional(),
  NODE_ENV: z.string().optional(),
});

export const env = envSchema.parse(process.env);
