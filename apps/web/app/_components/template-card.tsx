'use client';

import { Button } from '@nxnext/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@nxnext/ui/card';
import Image from 'next/image';

import { Download } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  downloads: number;
  price: number;
  image: string;
}

export default function TemplateCard({
  title,
  description,
  downloads,
  price,
  image,
}: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{downloads} downloads</span>
          </div>
          <span className="text-lg font-bold">${price}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Template</Button>
      </CardFooter>
    </Card>
  );
}
