import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { Card, CardHeader, CardBody } from '@matsugov/ui';

export function SearchListLoading({
  limit = 15,
  title,
}: {
  limit?: number;
  title: string;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <ul className="flex flex-col gap-4 mb-4">
        {Array.from({ length: limit }, (_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton
                className="usa-card__heading margin-top-0"
                baseColor="#ccc"
                highlightColor="#f0f0f0"
                borderRadius={0}
              />
            </CardHeader>

            <CardBody>
              <p>
                <Skeleton
                  count={2}
                  baseColor="#ccc"
                  highlightColor="#f0f0f0"
                  borderRadius={0}
                />
              </p>
            </CardBody>
          </Card>
        ))}
      </ul>
    </>
  );
}
