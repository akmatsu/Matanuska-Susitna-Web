import { Grid, GridContainer } from '@trussworks/react-uswds';

export function Toolbelt() {
  const tools = [{}, {}, {}, {}];
  return (
    <div className="usa-section bg-transparent position-relative margin-top-neg-15 z-200 grid-container maxw-desktop">
      <Grid row className="usa-list--unstyled" gap="md">
        {tools.map((tool) => (
          <Grid col={12} tablet={{ col: 3 }}>
            <div className="width-full height-10 bg-primary-light"></div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
