import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { Card, CardHeader, CardBody } from '@trussworks/react-uswds';

export function SearchListLoading({
  limit = 15,
  title,
}: {
  limit?: number;
  title: string;
}) {
  return (
    <>
      <h1>{title}</h1>
      <ul className="usa-list--unstyled">
        {Array.from({ length: limit }, (_, index) => (
          <Card key={index} className="usa-card margin-bottom-2">
            <CardHeader className="padding-top-2">
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
