'use client';
import { Button } from '@trussworks/react-uswds';
import React, { useEffect, useState } from 'react';
import { CoreModal } from './CoreModal';

export const FeedbackModal = () => {
  const [page, setPage] = useState('/');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(window.location.pathname);
    setPage(window.location.pathname || '/');
  }, [modalVisible]);

  return (
    <>
      <Button
        onClick={() => setModalVisible((v) => !v)}
        type="button"
        className="position-fixed bottom-105 right-105"
      >
        Give us Feedback
      </Button>
      <CoreModal
        id="feedback-modal"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div style={{ height: '100%', width: '100%' }} className="display-flex">
          <iframe
            src={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${page}`}
            style={{ height: '681px', width: '100%', border: 'none' }}
          ></iframe>
        </div>
      </CoreModal>
    </>
  );
};
