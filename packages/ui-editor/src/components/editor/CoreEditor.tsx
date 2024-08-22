'use client';
import { TopBar } from './TopBar';
import { Btn, Card, CardBottom, CardTop, Container, Text } from '../user';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { Editor, Frame, Element } from '@craftjs/core';
import { MCard } from '@matsugov/ui';

export function CoreEditor() {
  return (
    <Editor resolver={{ Card, Btn, Text, Container, CardBottom, CardTop }}>
      {/* <TopBar /> */}

      <div className="flex w-full gap-6">
        <div className="w-full flex-grow">
          <Frame>
            <Element is={Container} canvas>
              <Card />
              <Btn color="primary">Click</Btn>
              <Text text="Hi world!" fontSize="16" />
              <Element is={Container} canvas>
                <Text fontSize="16" text="It's me again!" />
              </Element>
            </Element>
          </Frame>
        </div>
        <div className="w-full max-w-56 flex-grow-0">
          <MCard>
            <Toolbox />
            <SettingsPanel />
          </MCard>
        </div>
      </div>
    </Editor>
  );
}
