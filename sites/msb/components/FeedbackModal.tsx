'use client';
import {
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton,
} from '@trussworks/react-uswds';
import React, { useRef } from 'react';

export const FeedbackModal = () => {
  const modelRef = useRef<ModalRef>(null);
  return (
    <>
      <ModalToggleButton
        className="position-fixed bottom-105 right-105"
        modalRef={modelRef}
      >
        Click me baby!
      </ModalToggleButton>
      <Modal ref={modelRef} id="feedback-modal">
        <div style={{ height: '100%', width: '100%' }} className="display-flex">
          <iframe
            src="https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?url=/page"
            style={{ height: '681px', width: '100%', border: 'none' }}
          ></iframe>
        </div>
      </Modal>
    </>
  );
};
