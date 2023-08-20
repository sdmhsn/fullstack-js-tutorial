import React from 'react';

import { Link } from 'react-router-dom';

import { config } from '../../config';

export const StoreLogo = () => {
  return (
    <Link to="/">
      <div className="text-red-600 font-bold text-3xl">{config.site_title}</div>
    </Link>
  );
};
