import React from 'react';

import { Badge } from 'upkit';

import { string } from 'prop-types';

export const StatusLabel = ({ status }) => {
  switch (status) {
    case 'waiting_payment':
      return <Badge color="orange">Waiting payment</Badge>;
    case 'paid':
      return <Badge color="green">Paid</Badge>;
    case 'processing':
      return <Badge color="yellow">Processing</Badge>;
    case 'in_delivery':
      return <Badge color="blue">In delivery</Badge>;
    case 'delivered':
      return <Badge color="green">Delivered</Badge>;
    default:
      return <div />;
  }
};

StatusLabel.defaultProps = {};
StatusLabel.propTypes = {
  status: string.isRequired,
};
