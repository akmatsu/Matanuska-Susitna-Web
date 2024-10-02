import { Grid, GridContainer } from '@trussworks/react-uswds';
import { ReactNode } from 'react';

export function ThreeColumnLayout(props: {
  left?: ReactNode;
  children?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <GridContainer>
      <Grid row gap>
        <Grid desktop={{ col: 3 }}>{props.left}</Grid>
        <Grid desktop={{ col: 6 }}>{props.children}</Grid>
        <Grid desktop={{ col: 3 }}>{props.right}</Grid>
      </Grid>
    </GridContainer>
  );
}
