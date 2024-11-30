import {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardProps,
} from './types';

export function Card(props: CardProps) {
  return (
    <div
      className={`bg-white flex flex-col col-span-6 @tablet:col-span-3 @desktop:col-span-2 ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export function CardHeader({ tag = 'h2', ...props }: CardHeaderProps) {
  const Tag = tag;

  return (
    <div className="border-x-2 border-t-2 border-gray-10 rounded-t px-6 pt-6 pb-2">
      <Tag className={`font-bold font-serif text-lg ${props.className}`}>
        {props.children}
      </Tag>
    </div>
  );
}

export function CardBody(props: CardBodyProps) {
  return (
    <div
      className={`border-x-2 border-gray-10 px-6 py-2 grow ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export function CardFooter(props: CardFooterProps) {
  return (
    <div
      className={`border-x-2 border-b-2 border-gray-10 rounded-b px-6 pb-6 pt-2 ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export function CardMedia(props: CardMediaProps) {
  <img src={props.src} className={props.className}></img>;
}
