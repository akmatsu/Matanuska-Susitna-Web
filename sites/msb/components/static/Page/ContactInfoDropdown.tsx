'use client';

import { CardBody } from '@matsugov/ui/Card';
import { FC, useState } from 'react';
import { Link } from '../Link';
import { PhoneLink } from '../PhoneLink';

interface ContactInfoDropdownProps {
  email?: string;
  cell?: string;
  homePhone?: string;
  workPhone?: string;
  address?: string;
}

const ContactInfoDropdown: FC<ContactInfoDropdownProps> = ({
  email,
  cell,
  homePhone,
  workPhone,
  address,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasContactInfo = email || cell || homePhone || workPhone || address;

  if (!hasContactInfo) {
    return null;
  }

  return (
    <CardBody className="p-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium">Contact Information</span>
        <span
          className={`icon-[mdi--chevron-down] size-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-6 py-4">
          <ul className="grid grid-cols-2 gap-2">
            {email && (
              <li className="flex items-center gap-1">
                <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                  <span className="icon-[mdi--email] size-4 text-white" />
                </div>
                <Link href={`mailto:${email}`} className="truncate">
                  {email}
                </Link>
              </li>
            )}
            {cell && (
              <li className="flex items-center gap-1">
                <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                  <span className="icon-[mdi--cellphone] size-4 text-white" />
                </div>
                <PhoneLink phoneNumber={cell} className="truncate" />
              </li>
            )}
            {homePhone && (
              <li className="flex items-center gap-1">
                <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                  <span className="icon-[mdi--phone] size-4 text-white" />
                </div>
                <PhoneLink phoneNumber={homePhone} className="truncate" />
              </li>
            )}
            {workPhone && (
              <li className="flex items-center gap-1">
                <div className="bg-primary inline-flex items-center justify-center rounded-full p-1">
                  <span className="icon-[mdi--briefcase] size-4 text-white" />
                </div>
                <PhoneLink phoneNumber={workPhone} className="truncate" />
              </li>
            )}
            {address && (
              <li className="flex items-start gap-1">
                <div className="bg-primary mt-0.5 inline-flex items-center justify-center rounded-full p-1">
                  <span className="icon-[mdi--map-marker] size-4 text-white" />
                </div>
                <span className="text-sm">{address}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </CardBody>
  );
};

export { ContactInfoDropdown };
