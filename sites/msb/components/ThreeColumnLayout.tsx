import { ReactNode } from 'react';

export function ThreeColumnLayout(props: {
  left?: ReactNode;
  children?: ReactNode;
  right?: ReactNode;
}) {
  return <></>;
  // return (
  // <GridContainer>
  //   <Grid row gap>
  //     <Grid desktop={{ col: 3 }} className="margin-bottom-4">
  //       {props.left}
  //     </Grid>
  //     <Grid desktop={{ col: 6 }}>{props.children}</Grid>
  //     <Grid desktop={{ col: 3 }}>{props.right}</Grid>
  //   </Grid>
  // </GridContainer>
  // );
}
