'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@nxnext/ui/avatar';
import { Badge } from '@nxnext/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nxnext/ui/card';
import Link from 'next/link';

import { Github, Globe, Twitter } from 'lucide-react';

export default function ProfileCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
            alt="Profile"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Full Stack Developer & DevOps Engineer</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Passionate about creating scalable infrastructure solutions and sharing knowledge with the
          developer community. Specialized in Railway deployments and cloud architecture.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Docker</Badge>
          <Badge variant="secondary">Kubernetes</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">PostgreSQL</Badge>
          <Badge variant="secondary">Railway</Badge>
        </div>

        <div className="flex gap-4 pt-2">
          <Link
            href="https://github.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-5 w-5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
