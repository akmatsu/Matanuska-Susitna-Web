import { Grid, GridContainer } from '@trussworks/react-uswds';
import { ReactNode } from 'react';

export function ThreeColumnLayout(props: {
  leftCol?: ReactNode;
  centerCol?: ReactNode;
  rightCol?: ReactNode;
}) {
  return (
    <GridContainer>
      <Grid row gap>
        <Grid desktop={{ col: 3 }}>{props.leftCol}</Grid>
        <Grid desktop={{ col: 6 }}>{props.centerCol}</Grid>
        <Grid desktop={{ col: 3 }}>{props.rightCol}</Grid>
      </Grid>
    </GridContainer>
  );
}
