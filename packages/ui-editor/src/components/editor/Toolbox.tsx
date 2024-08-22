'use client';
import { Btn, Card, Container, Text } from '../user';
import { Element, useEditor } from '@craftjs/core';
import { ifTrue } from '../../utils/jsHelpers';
import { MButton } from '@matsugov/ui';

export function Toolbox() {
  const { connectors, query } = useEditor();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>
        <p>Drag to add</p>
      </div>
      <div className="flex flex-col">
        <MButton
          ref={(ref) =>
            ifTrue(ref, (r) => connectors.create(r, <Btn>Click me</Btn>))
          }
        >
          Button
        </MButton>
      </div>
      <div className="flex flex-col">
        <MButton
          ref={(ref) =>
            ifTrue(ref, (r) =>
              connectors.create(r, <Text text="hello world!" />),
            )
          }
        >
          Text
        </MButton>
      </div>
      <div className="flex flex-col">
        <MButton
          ref={(ref) =>
            ifTrue(ref, (r) =>
              connectors.create(r, <Element is={Container} canvas />),
            )
          }
        >
          Container
        </MButton>
      </div>
      <div className="flex flex-col">
        <MButton
          ref={(ref) => ifTrue(ref, (r) => connectors.create(r, <Card />))}
        >
          Card
        </MButton>
      </div>
    </div>
  );
}
