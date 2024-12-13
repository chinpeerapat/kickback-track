'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nxnext/ui/card';

import { Code2, GitFork, Star } from 'lucide-react';

export default function StatsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Template Stats</CardTitle>
        <CardDescription>Overall template performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
              <h3 className="text-2xl font-bold">4.8/5</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Templates</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <GitFork className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Forks</p>
              <h3 className="text-2xl font-bold">1.2k</h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
