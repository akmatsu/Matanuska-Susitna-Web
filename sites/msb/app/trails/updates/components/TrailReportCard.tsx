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
import { FeatureAttributes } from '../utils';
import { Text } from '@matsugov/ui/Text';
import { DateTime } from '@/components/client/DateTime';
import v from 'voca';
import { TrailReportImages } from './TrailReportImages';

export function TrailReportCard({ data: a }: { data: FeatureAttributes }) {
  return (
    <Card key={a.objectid} as="li" className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle titleSize="lg">
              {(
                a.system_name?.replace('other', '') +
                  `${a.system_name_other ? `${a.system_name_other}` : ''}` ||
                a.system_name_other
              )
                ?.toLocaleLowerCase()
                .split(/[\s_]+/)
                .map((part) => v.capitalize(part))
                .join(' ')
                .split('-')
                .map((part) => v.capitalize(part))
                .join('-')
                .split(',')
                .map((part) => v.capitalize(part))
                .join(',')
                .replace(/,(\w)/gi, ', $1')}
            </CardTitle>
            <Text type="body-sm" className="text-base-dark italic">
              <DateTime date={a._date} formatStr="MMMM dd, yyyy" />
            </Text>
          </div>
          <TrailReportImages id={a.objectid} />
        </div>
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
            {a.trail_maintenance_partner && (
              <Tr>
                <Td>
                  <span className="font-semibold">Maintainer</span>
                </Td>
                <Td>
                  {a.trail_maintenance_partner
                    ?.toLocaleLowerCase()
                    .split(/[\s_]+/)
                    .map((part) => v.capitalize(part))
                    .join(' ')
                    .split('-')
                    .map((part) => v.capitalize(part))
                    .join('-')}
                </Td>
              </Tr>
            )}
            <Tr>
              <Td>
                <span className="font-semibold">Trails maintained</span>
              </Td>
              <Td>{a.trails_maintained}</Td>
            </Tr>
            {/* Fall back to deprecated trail_conditions if trail_conditions_ is not available */}
            {(a.trail_conditions_ || a.trail_conditions) && (
              <Tr>
                <Td>
                  <span className="font-semibold">Trail conditions</span>
                </Td>
                {/* Fall back to deprecated trail_conditions if trail_conditions_ is not available */}
                <Td>{a.trail_conditions_ || a.trail_conditions}</Td>
              </Tr>
            )}

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
                key === '_date' ||
                key === 'system_name' ||
                key === 'system_name_other' ||
                key === 'trail_conditions' ||
                key === 'trail_conditions_' ||
                key === 'trails_maintained'
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
                      {v.capitalize(key.replace(/[_-]/gi, ' '))}{' '}
                      {(key === 'depth_of_last_snowfall' ||
                        key === 'current_loose_snow_base' ||
                        key === 'packed_trail_base') &&
                        '(in)'}
                    </span>
                  </Td>
                  <Td>
                    {key.toLowerCase().includes('date') ? (
                      <DateTime date={value} formatStr="MMMM dd, yyyy" />
                    ) : typeof value === 'string' ? (
                      value.replace(/_/gi, ' ')
                    ) : (
                      String(value)
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
}
