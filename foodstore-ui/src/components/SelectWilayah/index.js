import React, { useState } from 'react';

import axios from 'axios';

import { config } from '../../config';

import { oneOf, oneOfType, number, string, func, shape } from 'prop-types';

import { Select } from 'upkit';

export const SelectWilayah = ({ tingkat, kodeInduk, onChange, value }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(
        `${config.api_host}/api/regions/${tingkat}?
    kode_induk=${kodeInduk}`
      )
      .then(({ data }) => setData(data))
      .finally(() => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  // console.log(value);

  return (
    <Select
      options={data.map((region) => ({
        label: region.nama,
        value: region.kode,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
};

SelectWilayah.defaultProps = {
  tingkat: 'provinces',
};

SelectWilayah.propTypes = {
  tingkat: oneOf(['provinces', 'regencies', 'districts', 'villages']),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};
