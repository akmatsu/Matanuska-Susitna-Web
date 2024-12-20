import { Button } from '@matsugov/ui';
import {
  Grid,
  CardHeader,
  CardBody,
  Card,
  CardFooter,
} from '@trussworks/react-uswds';

export function Meetings() {
  const meetings: {
    date: string | number;
    location: string;
    title: string;
  }[] = [
    {
      date: Date.now(),
      location: '350 E Dahlia Ave, Assembly Chambers',
      title: 'Abbreviated Plat',
    },
    {
      date: Date.now(),
      location:
        'Lower Level Conference Room, 350 E Dahlia Ave, Palmer, AK 99645, USA',
      title: 'Agriculture Advisory Board',
    },
    {
      date: Date.now(),
      location: '680 N Seward Meridian Parkway, Wasilla Casey L',
      title: 'Local Emergency Planning Committee',
    },
    {
      date: Date.now(),
      location: 'Latitude 62, Talkeetna',
      title: 'Chase Community Council',
    },
  ];

  function formatDate(d: string | number) {
    const date = new Date(d);
    return date.toLocaleDateString();
  }
  return (
    <Grid row gap="md">
      {meetings.map((meeting) => (
        <Grid
          col={12}
          tablet={{ col: 6 }}
          key={crypto.randomUUID()}
          className="margin-bottom-2"
        >
          <Card className="usa-list--unstyled height-full">
            <CardHeader>
              <h4>{meeting.title}</h4>
              <span className="font-body-sm">{formatDate(meeting.date)}</span>
            </CardHeader>
            <CardBody>{meeting.location}</CardBody>
            <CardFooter>
              <Button>Add to Calendar</Button>
            </CardFooter>
          </Card>
        </Grid>
      ))}
      <div className="display-flex flex-row flex-justify-center flex-align-center width-full">
        <Button big>View all</Button>
      </div>
    </Grid>
  );
}
