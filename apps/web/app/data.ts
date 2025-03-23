import { unstable_cache as cache } from 'next/cache';

import { env } from './_env';
import { GithubProfile, Props, RailwayProfile, TeamTemplate } from './types';

async function getUsernameAndWorkspaces() {
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
    workspaces {
      id
    }
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

  return {
    username: data.me.username,
    workspaces: (data.me.workspaces as { id: string }[]).map((workspace) => workspace.id),
  };
}

async function getUserProfile(username: string) {
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
}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get user profile: ${response.status} ${response.statusText}. Please check your Railway token.`,
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

  return {
    railwayProfile,
    githubProfile,
  };
}

async function getTeamTemplates(workspace: string): Promise<TeamTemplate[]> {
  const response = await fetch(`https://backboard.railway.com/graphql/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query MyQuery {
  teamTemplates(teamId: "${workspace}") {
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
  }
  referralInfo(workspaceId: "${workspace}") {
    code
  }
}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get team templates: ${response.status} ${response.statusText}. Please check your Railway token.`,
    );
  }

  const { data, errors } = await response.json();

  if (errors && errors.length) {
    throw new Error(`Failed to get data: ${errors[0].message}`);
  }

  return data.teamTemplates.edges
    .map((edge: any) => edge.node as TeamTemplate)
    .filter((template: TeamTemplate) => template.status === 'PUBLISHED')
    .map((template: TeamTemplate) => ({
      ...template,
      referralCode: data.referralInfo.code,
    }));
}

async function getData(): Promise<Props> {
  const { username, workspaces } = await getUsernameAndWorkspaces();

  const [userProfile, ...teamTemplates] = await Promise.all([
    getUserProfile(username),
    ...workspaces.map((workspace) => getTeamTemplates(workspace)),
  ]);

  const templates = teamTemplates.flat();

  const allLanguages = [
    ...new Set(
      templates.reduce((acc: string[], template: TeamTemplate) => {
        return [...acc, ...template.languages];
      }, []),
    ),
  ] as string[];

  return {
    railwayProfile: userProfile.railwayProfile,
    githubProfile: userProfile.githubProfile,
    templates: templates.sort((a, b) => b.totalPayout - a.totalPayout),
    allLanguages,
  };
}

export const getCachedData = cache(getData, ['data'], {
  revalidate: 60 * 5, // 5 minutes
});
