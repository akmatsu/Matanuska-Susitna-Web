import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@matsugov/ui';

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {meetings.map((meeting) => (
          <Card className="h-full justify-between">
            <CardHeader>
              <CardTitle>{meeting.title}</CardTitle>
              <span className="font-body-sm">{formatDate(meeting.date)}</span>
            </CardHeader>
            <CardBody>
              <p>{meeting.location}</p>
            </CardBody>
            <CardFooter>
              <Button>Add to Calendar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center w-full">
        <Button big>View all</Button>
      </div>
    </>
  );
}
