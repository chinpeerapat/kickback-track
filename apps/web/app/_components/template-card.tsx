import { Avatar, AvatarFallback, AvatarImage } from '@nxnext/ui/avatar';
import { Button } from '@nxnext/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@nxnext/ui/card';
import Link from 'next/link';

import { Download, ExternalLink } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  downloads: number;
  price: number;
  image: string;
  code: string;
  referralCode: string;
  activeProjects: number;
}

export default function TemplateCard({
  title,
  description,
  downloads,
  price,
  image,
  code,
  referralCode,
  activeProjects,
}: TemplateCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-10 w-10 mt-1.5">
          <AvatarImage src={image} alt={title} />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
            <Download className="h-4 w-4 mt-0.5" />
            <div>
              <span>{downloads} deploys</span>
              <br />
              <span>{activeProjects} active</span>
            </div>
          </div>
          <span className="text-lg font-bold">${price}</span>
        </div>
      </CardContent>
      <div className="flex-1" />
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link
            href={`https://railway.app/template/${code}?referralCode=${referralCode}`}
            target="_blank"
          >
            Deploy <ExternalLink />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
