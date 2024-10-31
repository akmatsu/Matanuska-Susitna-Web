'use client';
import { Button, Card, CardBody } from '@trussworks/react-uswds';
import { PropsWithChildren, useEffect } from 'react';
import { CoreIcon } from './CoreIcon';

export function CoreModal(
  props: PropsWithChildren<{
    visible?: boolean;
    id?: string;
    onClose?: () => void;
  }>,
) {
  useEffect(() => {
    if (props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [props.visible]);

  return (
    props.visible && (
      <div
        className="position-fixed display-flex flex-align-center flex-justify-center"
        style={{
          width: '100vw',
          height: '100vh',
          top: '0',
          background: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
        }}
      >
        <Card className="maxw-tablet-lg width-full">
          <div className="display-flex flex-justify-end">
            <Button
              type="button"
              onClick={props.onClose}
              className="padding-05"
              unstyled
            >
              <CoreIcon icon="Close" ariaLabel="close" color="black" size={3} />
            </Button>
          </div>
          <CardBody>{props.children}</CardBody>
        </Card>
      </div>
    )
  );
}
