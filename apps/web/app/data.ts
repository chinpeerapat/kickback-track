import process from 'node:process';

import { GithubProfile, Props, RailwayProfile, UserTemplate } from './types';

async function getUsername() {
  const { data } = await fetch(`https://backboard.railway.com/graphql/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query MyQuery {
  me {
    username
  }
}`,
    }),
  }).then((res) => res.json());

  return data.me.username;
}

export async function getData(): Promise<Props> {
  const username = await getUsername();

  const { data } = await fetch(`https://backboard.railway.com/graphql/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RAILWAY_TOKEN}`,
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
  }).then((res) => res.json());

  console.log(data.userTemplates.edges.at(0).node);

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
