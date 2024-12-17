import { Grid, GridContainer } from '@trussworks/react-uswds';
import { ReactNode } from 'react';

export function TwoColumnLayout(props: {
  right?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <GridContainer>
      <Grid row gap>
        <Grid desktop={{ col: 8 }}>{props.children}</Grid>
        <Grid desktop={{ col: 4 }}>{props.right}</Grid>
      </Grid>
    </GridContainer>
  );
}
