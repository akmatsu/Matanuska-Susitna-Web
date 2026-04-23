async function getData(): Promise<
  { id: number; abbrev: string; alt: string; coords: string }[]
> {
  const url = new URL(`${process.env.API_URL}/property/taxmapareas`);
  const res = await fetch(url.toString(), {
    headers: {
      ApiKey: process.env.API_KEY || '',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch tax map areas: ' + res.status);

  return res.json();
}

export async function TaxMapImageMap() {
  const data = await getData();
  console.log('Tax map areas:', data);
  return (
    <map id="basemap" name="basemap">
      {data.map((area) => (
        <area
          key={area.id}
          shape={area.coords.split(',').length === 4 ? 'rect' : 'poly'}
          coords={area.coords}
          href={`/taxmaps/${area.abbrev}`}
          alt={area.alt}
        />
      ))}
    </map>
  );
}
