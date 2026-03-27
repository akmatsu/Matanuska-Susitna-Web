import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@matsugov/ui/Card';
import { Text } from '@matsugov/ui/Text';
import { FC } from 'react';
import { Link } from '../Link';
import { PhoneLink } from '../PhoneLink';
import { DateTime } from '@/components/client/DateTime';
import { gql } from '@msb/js-sdk/gql';
import { getClientHandler } from '@/utils/apollo/utils';
import { LinkButton } from '../LinkButton';

const query = gql(`
  query GetBoardApplication {
    boardPage {
      applicationForm { 
        title
        file {
          url
          filename
        }
      }
    }
  }
`);

interface DirectoryMember {
  BoardPosition: string;
  FirstName?: string;
  LastName?: string;
  'E-mail'?: string;
  Cell?: string;
  HomePhone?: string;
  WorkPhone?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  TermEnds?: number | string;
  TermBegins?: number | string;
  TypeOfTerm?: string;
  NumberOfTerms?: string;
  'Middle Initial'?: string;
}

const dateFormat = 'M/d/yy';

interface BoardDirectoryDisplayProps {
  data: DirectoryMember[];
}

const BoardDirectoryDisplay: FC<BoardDirectoryDisplayProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No directory information available.</p>;
  }

  return (
    <ul className="space-y-4">
      {data.map((member, index) => (
        <DirectoryCard key={index} member={member} />
      ))}
    </ul>
  );
};

const DirectoryCard: FC<{ member: DirectoryMember }> = async ({ member }) => {
  const isVacancy = !member.FirstName && member.LastName === 'vacancy';
  const fullName = [
    member.FirstName,
    member['Middle Initial'] ? `${member['Middle Initial']}.` : undefined,
    member.LastName,
  ]
    .filter(Boolean)
    .join(' ');
  const address = [member.Address, member.City, member.State, member.Zip]
    .filter(Boolean)
    .join(', ')
    .replace(', ,', ',');

  const termBegins =
    typeof member.TermBegins === 'number'
      ? new Date((member.TermBegins - 25569) * 86400 * 1000)
      : member.TermBegins;
  const termEnds =
    typeof member.TermEnds === 'number'
      ? new Date((member.TermEnds - 25569) * 86400 * 1000)
      : member.TermEnds;

  if (isVacancy) {
    const { data } = await getClientHandler({
      query,
    });

    const applicationForm = data?.boardPage?.applicationForm;
    const applicationUrl = applicationForm?.file?.url;

    return (
      <Card as="li" className="bg-yellow-5! border-warning! h-full">
        <CardHeader>
          <CardTitle as="h3">Vacant Position</CardTitle>
          <Text type="subtitle">{member.BoardPosition}</Text>
        </CardHeader>
        <CardBody>
          <p className="text-muted-foreground text-sm">
            This board seat is currently vacant.
          </p>
        </CardBody>
        {applicationForm && applicationUrl && (
          <CardFooter>
            <LinkButton href={applicationUrl} color="primary">
              Apply
            </LinkButton>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card as="li" className="h-full">
      <CardHeader>
        <CardTitle as="h3">{fullName || 'Board Member'} </CardTitle>
        <Text type="subtitle">{member.BoardPosition}</Text>
        {(member.TypeOfTerm ||
          member.NumberOfTerms ||
          termBegins ||
          termEnds) && (
          <div className="flex items-start gap-1">
            <span className="text-sm">
              {member.NumberOfTerms && `Terms: ${member.NumberOfTerms}`}
              {member.TypeOfTerm && member.NumberOfTerms ? ' · ' : ''}
              {member.TypeOfTerm && `Type: ${member.TypeOfTerm}`}
              {(member.TypeOfTerm || member.NumberOfTerms) && (
                <DateTime
                  date={termBegins || termEnds}
                  formatStr={dateFormat}
                  className="font-semibold"
                />
              )
                ? ' · '
                : ''}
              {termBegins && (
                <>
                  Begins:{' '}
                  <DateTime
                    date={termBegins}
                    formatStr={dateFormat}
                    className="font-semibold"
                  />
                </>
              )}
              {termBegins && termEnds ? ' · ' : ''}
              {termEnds && (
                <>
                  Ends:{' '}
                  <DateTime
                    date={termEnds}
                    formatStr={dateFormat}
                    className="font-semibold"
                  />
                </>
              )}
            </span>
          </div>
        )}
      </CardHeader>
      <CardBody>
        <ul className="grid grid-cols-2 gap-2">
          {member['E-mail'] && (
            <li className="flex items-center gap-1">
              <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                <span className="icon-[mdi--email] size-4 text-white" />
              </div>
              <Link href={`mailto:${member['E-mail']}`} className="truncate">
                {member['E-mail']}
              </Link>
            </li>
          )}
          {member.Cell && (
            <li className="flex items-center gap-1">
              <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                <span className="icon-[mdi--cellphone] size-4 text-white" />
              </div>
              <PhoneLink phoneNumber={member.Cell} className="truncate" />
            </li>
          )}
          {member.HomePhone && (
            <li className="flex items-center gap-1">
              <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                <span className="icon-[mdi--phone] size-4 text-white" />
              </div>
              <PhoneLink phoneNumber={member.HomePhone} className="truncate" />
            </li>
          )}
          {member.WorkPhone && (
            <li className="flex items-center gap-1">
              <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                <span className="icon-[mdi--briefcase] size-4 text-white" />
              </div>
              <PhoneLink phoneNumber={member.WorkPhone} className="truncate" />
            </li>
          )}
          {address && (
            <li className="flex items-start gap-1">
              <div className="bg-primary mt-0.5 inline-flex items-center justify-center rounded-full p-1">
                <span className="icon-[mdi--map-marker] size-4 text-white" />
              </div>
              <span className="text-sm">{address}</span>
            </li>
          )}
        </ul>
      </CardBody>
    </Card>
  );
};

export { BoardDirectoryDisplay };
