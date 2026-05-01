'use client';

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@matsugov/ui/Dialog';
import Link from 'next/link';

import { useState } from 'react';

export function MapModal(props: { pid: string; map: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert each url string to an object with a label, url, and icon field
  const mapUrls = [
    {
      name: 'Parcel Viewer',
      url: `https://parcelviewer.matsu.gov/vertigisstudio/web/?app=05240199d948427e88bf8ea2ebea9513&workflow=b3ee4694-fbe2-4683-b4e9-114fe8d4cca0&workflowParams=${props.pid}`,
      icon: 'icon-[mdi--map-search-outline]',
    },
    {
      name: 'Tax Map PDF',
      url: `https://matsugov.us/taxmaps/pdf/${props.map.toUpperCase()}.pdf`,
      icon: 'icon-[mdi--pdf-box]',
    },
    {
      name: 'Tax Map DXF',
      url: `https://matsugov.us/taxmaps/dxf/${props.map.toUpperCase().replace(/\d/g, '0')}.dxf`,
      icon: 'icon-[mdi--vector-square]',
    },
    {
      name: 'Land Use Regulations',
      url: `https://msb.maps.arcgis.com/apps/webappviewer/index.html?id=4cd76b7861f348e68afd5cc934524a5f&find=${props.pid}`,
      icon: 'icon-[mdi--map-check-outline]',
    },
    {
      name: 'My Elected Officials',
      url: `https://msb.maps.arcgis.com/apps/instant/lookup/index.html?appid=4e1f5b5861d54908970ee25d0955e4fb&find=${props.pid}`,
      icon: 'icon-[mdi--account-group-outline]',
    },
    {
      name: 'Assembly District',
      url: `https://experience.arcgis.com/experience/4b32277060a541c4b391c57e54c78c98/page/MSB-Boundaries?views=Assembly-Districts&find=${props.pid}`,
      icon: 'icon-[mdi--map-outline]',
    },
    {
      name: 'Community Council',
      url: `https://experience.arcgis.com/experience/4b32277060a541c4b391c57e54c78c98/page/MSB-Boundaries?views=Community-Councils&find=${props.pid}`,
      icon: 'icon-[mdi--house-group]',
    },
    {
      name: 'Fire Service Areas',
      url: `https://experience.arcgis.com/experience/4b32277060a541c4b391c57e54c78c98/page/MSB-Boundaries?views=Fire-Service-Areas&find=${props.pid}`,
      icon: 'icon-[mdi--fire-truck]',
    },
    {
      name: 'Road Service Areas',
      url: `https://experience.arcgis.com/experience/4b32277060a541c4b391c57e54c78c98/page/MSB-Boundaries?views=Road-Service-Areas&find=${props.pid}`,
      icon: 'icon-[mdi--road-variant]',
    },
    {
      name: 'Road Maintenance Map',
      url: `https://experience.arcgis.com/experience/f31a50bcf2ee43acbbf422e58334c1e4/page/Road-Maintenance-Map?find=${props.pid}%22%7D&zoom_to_selection=true`,
      icon: 'icon-[mdi--sign-caution]',
    },
    {
      name: 'Find My Elementary School',
      url: `https://experience.arcgis.com/experience/731a6eb55d0b4a6791340ca3342788ba/page/Find-My-Elementary-School?find=${props.pid}`,
      icon: 'icon-[mdi--house-outline]',
    },
    {
      name: 'Find My Middle School',
      url: `https://experience.arcgis.com/experience/731a6eb55d0b4a6791340ca3342788ba/page/Find-My-Middle-School?find=${props.pid}`,
      icon: 'icon-[mdi--bank-outline]',
    },
    {
      name: 'Find My High School',
      url: `https://experience.arcgis.com/experience/731a6eb55d0b4a6791340ca3342788ba/page/Find-My-High-School?find=${props.pid}`,
      icon: 'icon-[mdi--town-hall]',
    },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>View Maps</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 border bg-white p-6">
            <DialogTitle className="font-bold">
              Maps for Parcel {props.pid}
            </DialogTitle>
            <Description>
              View all of the maps available for this parcel.
            </Description>
            <ul className="grid gap-x-2 gap-y-1 sm:grid-cols-2">
              {mapUrls.map((item, index) => (
                <li key={index} className="flex">
                  <div
                    className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full p-1 text-white"
                    aria-hidden="true"
                  >
                    <span
                      className={`${item.icon} size-full`}
                      aria-hidden="true"
                    ></span>
                  </div>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
