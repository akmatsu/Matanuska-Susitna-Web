import { Btn } from './Btn';
import { Container } from './Container';
import { Text } from './Text';

export type CardProps = {
  background?: string;
  padding?: number | string;
};

export function Card({ background = 'default', padding = 20 }: CardProps) {
  return (
    <Container background={background} padding={padding}>
      <div className="text-only">
        <Text text="Title" fontSize="20" />
        <Text text="Subtitle" fontSize="15" />
      </div>
      <div className="buttons-only">
        <Btn size="small" variant="contained" color="primary">
          Learn More
        </Btn>
      </div>
    </Container>
  );
}
