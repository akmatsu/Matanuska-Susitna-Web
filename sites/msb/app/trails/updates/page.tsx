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
import { format } from 'date-fns';

import { TrailsUpdateSearchFilters } from './SearchFilters';

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

  const data = await getTrailUpdates({ maintainer, query });

  return (
    <PageContainer size="lg" breakPoint="sm">
      <ProseWrapper>
        <h1>Trail Updates</h1>

        <TrailsUpdateSearchFilters />
        <ul className="space-y-4 not-prose">
          {data.features?.map(({ attributes: a }) => {
            return (
              <Card key={a.objectid} as="li">
                <CardHeader>
                  <CardTitle titleSize="lg">{a.name}</CardTitle>
                  <Text type="body-sm" className="text-base-dark italic">
                    From{' '}
                    {a.trail_maintenance_partner
                      .toLocaleLowerCase()
                      .split(/[\s_]+/)
                      .map((part) => v.capitalize(part))
                      .join(' ')
                      .split('-')
                      .map((part) => v.capitalize(part))
                      .join('-')}{' '}
                    on {format(a._date, 'MMMM dd, yyyy')}
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
                            <Td>{value}</Td>
                          </Tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            );
          })}
        </ul>
      </ProseWrapper>
    </PageContainer>
  );
}
