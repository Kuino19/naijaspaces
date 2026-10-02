import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await prisma.property.findUnique({
    where: { id: resolvedParams.id },
    include: { agent: true }
  });

  if (!property) {
    return {
      title: 'Property Not Found - NaijaSpaces',
    };
  }

  const formattedPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(property.price);

  return {
    title: `${property.title} | NaijaSpaces`,
    description: `Rent or buy this beautiful ${property.type.toLowerCase()} located in ${property.city}, ${property.state} for ${formattedPrice}. Listed by ${property.agent?.name || 'an expert agent'}.`,
    openGraph: {
      title: `${property.title} - ${formattedPrice}`,
      description: `View this ${property.type.toLowerCase()} in ${property.city}. ${property.description.substring(0, 100)}...`,
      images: [
        {
          url: property.imageUrl ? property.imageUrl : 'https://naijaspaces.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: property.title,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} - ${formattedPrice}`,
      description: `View this ${property.type.toLowerCase()} in ${property.city}.`,
      images: [property.imageUrl ? property.imageUrl : 'https://naijaspaces.app/og-image.jpg'],
    }
  };
}

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
