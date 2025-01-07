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
      location: '123 N Example Ave, Earth',
      title: 'Nulla consectetur ad dolore',
    },
    {
      date: Date.now(),
      location: 'Somewhere, 123 E Example St, SomeCity, ST 12345, USA',
      title: 'Incididunt in enim et ad velit',
    },
    {
      date: Date.now(),
      location: '123 N Example St, SomeCity',
      title: 'Ea consequat incididunt',
    },
    {
      date: Date.now(),
      location: 'Latitude 62, SomeWhere',
      title: 'Nulla sint sunt.',
    },
  ];

  function formatDate(d: string | number) {
    const date = new Date(d);
    return date.toLocaleDateString();
  }
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {meetings.map((meeting) => (
          <Card as="li" className="h-full" key={meeting.title}>
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
      </ul>
      <div className="flex flex-row justify-center items-center w-full">
        <Button big>View all</Button>
      </div>
    </>
  );
}
