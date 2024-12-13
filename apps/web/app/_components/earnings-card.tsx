'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nxnext/ui/card';

import { DollarSign, TrendingUp, Users } from 'lucide-react';

export default function EarningsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Total Earnings</CardTitle>
        <CardDescription>Your template sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">$12,345</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">2,891</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Growth</p>
              <h3 className="text-2xl font-bold">+24.5%</h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
