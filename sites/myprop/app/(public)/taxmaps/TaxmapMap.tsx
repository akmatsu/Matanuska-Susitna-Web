type TaxMapArea = { id: number; abbrev: string; alt: string; coords: string };

async function getData(): Promise<TaxMapArea[]> {
  const url = new URL(`${process.env.API_URL}/property/taxmapareas`);
  const res = await fetch(url.toString(), {
    headers: { ApiKey: process.env.API_KEY || '' },
    // optional: Next.js caching hints if you want
    // next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch tax map areas: ' + res.status);
  return res.json();
}

function coordsToRect(coords: string) {
  const [x1, y1, x2, y2] = coords.split(',').map((n) => Number(n.trim()));
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  return { x, y, width, height };
}

function coordsToPoints(coords: string) {
  const nums = coords
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean);
  // convert "x1,y1,x2,y2,..." => "x1,y1 x2,y2 ..."
  const pairs: string[] = [];
  for (let i = 0; i < nums.length; i += 2) {
    pairs.push(`${nums[i]},${nums[i + 1]}`);
  }
  return pairs.join(' ');
}

export async function TaxMapMap() {
  const data = await getData();

  return (
    <svg
      viewBox="0 0 425 388"
      // className="h-97 w-106.25" // ✅ prevents distortion
      role="img"
      aria-label="Map of Matanuska-Susitna Borough broken up into tax map areas. Each area is marked with the abbreviation of the tax map area name."
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background artwork */}
      <image
        href="/overallindex.jpg"
        x={0}
        y={0}
        width="425"
        height="388"
        preserveAspectRatio="xMidYMin meet"
      />

      {/* Hotspots */}
      {data.map((area) => {
        const parts = area.coords
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const isRect = parts.length === 4;

        return (
          <a key={area.id} href={`/taxmaps/${area.abbrev}`}>
            {isRect ? (
              (() => {
                const r = coordsToRect(area.coords);
                return (
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.width}
                    height={r.height}
                    fill="transparent"
                    pointerEvents="all"
                    tabIndex={0}
                    aria-label={area.alt}
                    className="stroke-2 hover:stroke-red-500"
                  >
                    <title>{area.alt}</title>
                  </rect>
                );
              })()
            ) : (
              <polygon
                points={coordsToPoints(area.coords)}
                fill="transparent"
                pointerEvents="all"
                tabIndex={0}
                aria-label={area.alt}
                className="stroke-2 hover:stroke-red-500"
              >
                <title>{area.alt}</title>
              </polygon>
            )}
          </a>
        );
      })}
    </svg>
  );
}
