import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Td,
  Th,
  THead,
  Tr,
} from '@matsugov/ui';
import { Text } from '@matsugov/ui/Text';
import v from 'voca';
import { getTrailUpdates } from './utils';

import { TrailsUpdateSearchFilters } from './SearchFilters';
import { DateTime } from '@/components/client/DateTime';
import { Link } from '@/components/static/Link';

export default async function TrailsUpdatesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const maintainer = Array.isArray(searchParams.maintainer)
    ? searchParams.maintainer[0]
    : searchParams.maintainer;

  const query = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;

  const date = Array.isArray(searchParams.date)
    ? searchParams.date[0]
    : searchParams.date;

  const data = await getTrailUpdates({ maintainer, query, date });

  return (
    <PageContainer size="lg" breakPoint="sm">
      <ProseWrapper>
        <h1>Trail Updates</h1>

        <div className="mb-4 not-prose">
          <TrailsUpdateSearchFilters />
        </div>
        <ul className="space-y-4 not-prose">
          {data.features?.length ? (
            data.features?.map(({ attributes: a }) => {
              return (
                <Card key={a.objectid} as="li">
                  <CardHeader>
                    <CardTitle titleSize="lg">{a.name}</CardTitle>
                    <Text type="body-sm" className="text-base-dark italic">
                      From{' '}
                      <Link href={`?maintainer=${a.trail_maintenance_partner}`}>
                        {a.trail_maintenance_partner
                          .toLocaleLowerCase()
                          .split(/[\s_]+/)
                          .map((part) => v.capitalize(part))
                          .join(' ')
                          .split('-')
                          .map((part) => v.capitalize(part))
                          .join('-')}
                      </Link>{' '}
                      on <DateTime date={a._date} formatStr="MMMM dd, yyyy" />
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <THead>
                        <Tr>
                          <Th>Key</Th>
                          <Th>Value</Th>
                        </Tr>
                      </THead>
                      <tbody>
                        {Object.entries(a).map(([key, value]) => {
                          if (
                            key === 'objectid' ||
                            key === 'globalid' ||
                            key === 'name' ||
                            key === 'CreationDate' ||
                            key === 'Creator' ||
                            key === 'EditDate' ||
                            key === 'Editor' ||
                            key === 'trail_maintenance_partner' ||
                            key === '_date'
                          ) {
                            return null;
                          }
                          if (value === null || value === '') {
                            return null;
                          }
                          return (
                            <Tr key={key}>
                              <Td>
                                <span className="font-semibold">
                                  {v.capitalize(key.replace(/[_-]/gi, ' '))}
                                </span>
                              </Td>
                              <Td>
                                {key.toLowerCase().includes('date') ? (
                                  <DateTime
                                    date={value}
                                    formatStr="MMMM dd, yyyy"
                                  />
                                ) : (
                                  value
                                )}
                              </Td>
                            </Tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <p>No trail updates found.</p>
          )}
        </ul>
      </ProseWrapper>
    </PageContainer>
  );
}
