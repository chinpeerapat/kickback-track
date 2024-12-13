export type RailwayProfile = {
  id: string;
  name: string;
  state: string;
  totalDeploys: number;
  profile: {
    bio: string;
    website: string;
  };
  createdAt: string;
  avatar: string;
};

export type GithubProfile = {
  id: number;
  bio: string;
  url: string;
  blog: string;
  name: string;
  type: string;
  email: string;
  login: string;
  company: string;
  node_id: string;
  hireable: boolean;
  html_url: string;
  location: string;
  followers: number;
  following: number;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  created_at: string;
  events_url: string;
  site_admin: boolean;
  updated_at: string;
  gravatar_id: string;
  starred_url: string;
  public_gists: number;
  public_repos: number;
  followers_url: string;
  following_url: string;
  user_view_type: string;
  verifiedEmails: string[];
  twitter_username: string;
  organizations_url: string;
  subscriptions_url: string;
  notification_email: string;
  received_events_url: string;
};

export type UserTemplate = {
  id: string;
  activeProjects: number;
  guides: {
    post: string;
    video: string;
  };
  languages: string[];
  name: string;
  projects: number;
  readme: string;
  status: string;
  tags: string[];
  totalPayout: number;
  userId: string;
  category: string;
  code: string;
  communityThreadSlug: string;
  demoProjectId: string;
  description: string;
  health: number;
  image: string;
  createdAt: string;
};

export type Props = {
  railwayProfile: RailwayProfile;
  githubProfile: GithubProfile | null;
  userTemplates: UserTemplate[];
  allLanguages: string[];
  referralCode: string;
};
