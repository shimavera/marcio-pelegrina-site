import { useEffect } from 'react';

interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  telephone: string;
  geo_lat: number;
  geo_lng: number;
  url?: string;
  areaServed?: string[];
}

interface LocalBusinessSchemaProps {
  location: Location;
  rating?: {
    value: number;
    count: number;
  };
}

const LocalBusinessSchema = ({ location, rating }: LocalBusinessSchemaProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: `Dr. Luan Maciel - ${location.name}`,
      image: `${window.location.origin}/dr-luan-maciel-logo.webp`,
      '@id': location.url || window.location.origin,
      url: location.url || window.location.origin,
      telephone: location.telephone,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.postalCode || '03336-000',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.geo_lat,
        longitude: location.geo_lng,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: location.areaServed?.map(area => ({
        '@type': 'City',
        name: area,
      })) || [
        {
          '@type': 'City',
          name: location.city,
        },
      ],
      ...(rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.value.toString(),
          reviewCount: rating.count.toString(),
        },
      }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'local-business-schema';

    const existingScript = document.getElementById('local-business-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('local-business-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location, rating]);

  return null;
};

export default LocalBusinessSchema;
