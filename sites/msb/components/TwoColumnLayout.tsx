import { ReactNode } from 'react';

export function TwoColumnLayout(props: {
  right?: ReactNode;
  children?: ReactNode;
}) {
  return <></>;
  // return (
  // <GridContainer>
  //   <Grid row gap>
  //     <Grid desktop={{ col: 8 }}>{props.children}</Grid>
  //     <Grid desktop={{ col: 4 }}>{props.right}</Grid>
  //   </Grid>
  // </GridContainer>
  // );
}
