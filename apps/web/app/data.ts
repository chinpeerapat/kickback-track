import { unstable_cache as cache } from 'next/cache';

import { env } from './_env';
import { GithubProfile, Props, RailwayProfile, UserTemplate } from './types';

async function getUsername() {
  const response = await fetch(`https://backboard.railway.com/graphql/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query MyQuery {
  me {
    username
  }
}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get username: ${response.status} ${response.statusText}. Please check your Railway token.`,
    );
  }

  const { data, errors } = await response.json();

  if (errors && errors.length) {
    throw new Error(`Failed to get username: ${errors[0].message}`);
  }

  return data.me.username;
}

async function getData(): Promise<Props> {
  const username = await getUsername();

  const response = await fetch(`https://backboard.railway.com/graphql/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query MyQuery {
  userProfile(username: "${username}") {
    id
    name
    state
    totalDeploys
    profile {
      bio
      website
    }
    createdAt
    avatar
  }
  me {
    providerAuths(first: 10) {
      edges {
        node {
          provider
          metadata
        }
      }
    }
  }
  userTemplates(last: 100) {
    edges {
      node {
        id
        activeProjects
        guides {
          post
          video
        }
        languages
        name
        projects
        readme
        status
        tags
        totalPayout
        userId
        category
        code
        communityThreadSlug
        demoProjectId
        description
        health
        image
        createdAt
      }
    }
    pageInfo {
      endCursor
      startCursor
    }
  }
  referralInfo {
    code
  }
}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get data: ${response.status} ${response.statusText}. Please check your Railway token.`,
    );
  }

  const { data, errors } = await response.json();

  if (errors && errors.length) {
    throw new Error(`Failed to get data: ${errors[0].message}`);
  }

  const railwayProfile = data.userProfile as RailwayProfile;
  const githubProfile = data.me.providerAuths.edges.find(
    (edge: any) => edge.node.provider === 'github',
  )?.node?.metadata as GithubProfile | null;

  const userTemplates = data.userTemplates.edges
    .map((edge: any) => edge.node as UserTemplate)
    .filter((template: UserTemplate) => template.status === 'PUBLISHED') as UserTemplate[];

  const allLanguages = [
    ...new Set(
      userTemplates.reduce((acc: string[], template: UserTemplate) => {
        return [...acc, ...template.languages];
      }, []),
    ),
  ] as string[];

  return {
    railwayProfile,
    githubProfile,
    userTemplates: userTemplates.sort((a, b) => b.totalPayout - a.totalPayout),
    allLanguages,
    referralCode: data.referralInfo.code,
  };
}

export const getCachedData = cache(getData, ['data'], {
  revalidate: 60 * 5, // 5 minutes
});
