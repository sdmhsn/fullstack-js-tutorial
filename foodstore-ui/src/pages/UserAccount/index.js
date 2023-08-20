import React from 'react';

import { LayoutOne, Text, Card, Responsive } from 'upkit';

import { TopBar } from '../../components/TopBar';

import { Link } from 'react-router-dom';

import FaHome from '@meronex/icons/fa/FaHome';
import FaAddressBook from '@meronex/icons/fa/FaAddressBook';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaFileInvoice from '@meronex/icons/fa/FaFileInvoice';

const IconWrapper = ({ children }) => {
  return (
    <div className="text-white text-5xl flex justify-center mb-5">
      {children}
    </div>
  );
};

const menus = [
  {
    label: 'Home',
    icon: (
      <IconWrapper>
        <FaHome />
      </IconWrapper>
    ),
    url: '/',
  },
  {
    label: 'Address',
    icon: (
      <IconWrapper>
        <FaAddressBook />
      </IconWrapper>
    ),
    url: '/delivery-addresses',
  },
  {
    label: 'Order',
    icon: (
      <IconWrapper>
        <FaFileInvoice />
      </IconWrapper>
    ),
    url: '/order',
  },
  {
    label: 'Logout',
    icon: (
      <IconWrapper>
        <FaArrowRight />
      </IconWrapper>
    ),
    url: '/logout',
  },
];

export const UserAccount = () => {
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Your Account </Text>
      <br />

      <Responsive desktop={4} tablet={4} mobile={2}>
        {menus.map((menu, index) => {
          return (
            <div key={index} className="px-2 pb-2">
              <Link to={menu.url}>
                <Card
                  header={menu.icon}
                  body={
                    <div className="text-center font-bold textwhite">
                      {menu.label}
                    </div>
                  }
                />
              </Link>
            </div>
          );
        })}
      </Responsive>
    </LayoutOne>
  );
};
