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

import { Download } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  downloads: number;
  price: number;
  image: string;
  code: string;
  referralCode: string;
}

export default function TemplateCard({
  title,
  description,
  downloads,
  price,
  image,
  code,
  referralCode,
}: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
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
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{downloads} downloads</span>
          </div>
          <span className="text-lg font-bold">${price}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link
            href={`https://railway.app/template/${code}?referralCode=${referralCode}`}
            target="_blank"
          >
            View Template
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
