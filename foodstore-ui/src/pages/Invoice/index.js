import React from 'react';

import { useMatch } from 'react-router-dom';

import { getInvoiceByOrderId } from '../../api/invoice';
import { TopBar } from '../../components/TopBar';
import { formatRupiah } from '../../utils/format-rupiah';
import { config } from '../../config';
import { StatusLabel } from '../../components/StatusLabel';

import { LayoutOne, Text, Table } from 'upkit';

import BounceLoader from 'react-spinners/BounceLoader';

export const Invoice = () => {
  let [invoice, setInvoice] = React.useState(null);
  let [error, setError] = React.useState('');
  let [status, setStatus] = React.useState('process');
  // let dataUrl = useMatch('/invoice/*');
  // console.log(dataUrl); // e.g.: { "params": { "*": "64d9e62f27256266569b9461" }, "pathname": "/invoice/64d9e62f27256266569b9461", "pathnameBase": "/invoice", "pattern": { "path": "/invoice/*", "caseSensitive": false, "end": true } }
  let { params } = useMatch('/invoice/*'); // to get url param from url or route
  // console.log(params['*']); // e.g.: 64d9e62f27256266569b9461. we can using square brackets to get '*' character as key name
  // console.log(params?.['*']); // Optional Chaining.

  React.useEffect(() => {
    getInvoiceByOrderId(params?.['*'])
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || 'Unknow error!');
        }

        setInvoice(data);
      })
      .finally(() => setStatus('idle'));
  }, [params]); // getInvoiceByOrderId() not required for 1 of dependencies

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === 'process') {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Invoice </Text>
      <br />
      <Table
        showPagination={false}
        items={[
          {
            label: 'Status',
            value: <StatusLabel status={invoice?.payment_status} />,
          },
          { label: 'Order ID', value: '#' + invoice?.order?.order_number },
          { label: 'Total amount', value: formatRupiah(invoice?.total) },
          {
            label: 'Billed to',
            value: (
              <div>
                <b>{invoice?.user?.full_name} </b>
                <br />
                {invoice?.user?.email}
                <br />
                <br />
                {invoice?.delivery_address?.detail} <br />
                {invoice?.delivery_address?.village},
                {invoice?.delivery_address?.district} <br />
                {invoice?.delivery_address?.regency} <br />
                {invoice?.delivery_address?.province}
              </div>
            ),
          },
          {
            label: 'Payment to',
            value: (
              <div>
                {config.owner} <br />
                {config.contact} <br />
                {config.billing.account_no} <br />
                {config.billing.bank_name}
              </div>
            ),
          },
        ]}
        columns={[
          { Header: 'Invoice', accessor: 'label' },
          { Header: '', accessor: 'value' },
        ]}
      />
    </LayoutOne>
  );
};
