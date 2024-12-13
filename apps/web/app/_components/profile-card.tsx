import { Avatar, AvatarFallback, AvatarImage } from '@nxnext/ui/avatar';
import { Badge } from '@nxnext/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@nxnext/ui/card';
import Link from 'next/link';

import { Github, Globe, Twitter } from 'lucide-react';

import { Props } from '../types';

export default async function ProfileCard({ railwayProfile, allLanguages, githubProfile }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={railwayProfile.avatar} alt="Profile" />
          <AvatarFallback>
            {railwayProfile.name
              .split(' ')
              .map((name: string) => name[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{railwayProfile.name}</CardTitle>
          {/*<CardDescription></CardDescription>*/}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {railwayProfile.profile.bio || githubProfile?.bio || 'No bio provided'}
        </p>

        <div className="flex flex-wrap gap-2">
          {allLanguages.map((language: string) => (
            <Badge variant="secondary" key={language}>
              {language}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          {githubProfile?.html_url && (
            <Link
              href={githubProfile.html_url}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {githubProfile && githubProfile.twitter_username && (
            <Link
              href={`https://x.com/${githubProfile.twitter_username}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          )}
          {railwayProfile.profile.website && (
            <Link
              href={railwayProfile.profile.website}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-5 w-5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
