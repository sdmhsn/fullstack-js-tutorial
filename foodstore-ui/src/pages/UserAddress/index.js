import React from 'react';

import { TopBar } from '../../components/TopBar';
import { useAddressData } from '../../hooks/address';

import { Link } from 'react-router-dom';

import { LayoutOne, Text, Table, Button } from 'upkit';

const columns = [
  { Header: 'Name', accessor: 'name' },
  {
    Header: 'Detail',
    accessor: (address) => {
      // eslint-disable-next-line no-lone-blocks
      {
        /* address refer to backend model */
      }
      return (
        <div>
          {address.province}, {address.regency}, {address.district},
          {address.village} <br />
          {address.detail}
        </div>
      );
    },
  },
];

export const UserAddress = () => {
  let { data, limit, page, status, count, setPage } = useAddressData();

  console.log(data);

  return (
    <LayoutOne size="large">
      <TopBar />
      <Text as="h3"> Delivery Addresses </Text>
      {/* <Link to="/delivery-addresses/add">
          <Button>Add new</Button>
        </Link> */}

      {status === 'success' && !data.length ? (
        <div className="text-center p-10">
          Delivery address empty. <br />
          <Link to="/delivery-addresses/add">
            <Button> Add new </Button>
          </Link>
        </div>
      ) : null}
      <br />
      <br />
      <Table
        items={data}
        columns={columns}
        totalItems={count}
        page={page}
        isLoading={status === 'process'}
        perPage={limit}
        onPageChange={(page) => setPage(page)}
      />
      <br />
    </LayoutOne>
  );
};
