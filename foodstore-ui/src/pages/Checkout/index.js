import React from 'react';

import { LayoutOne, Text, Steps, Table, Button, Responsive } from 'upkit';

import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaAddressCard from '@meronex/icons/fa/FaAddressCard';
import FaInfoCircle from '@meronex/icons/fa/FaInfoCircle';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaRegCheckCircle from '@meronex/icons/fa/FaRegCheckCircle';

import { TopBar } from '../../components/TopBar';
import { config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import { sumPrice } from '../../utils/sum-price';
import { useAddressData } from '../../hooks/address';
import { createOrder } from '../../api/order';
import { clearItems } from '../../features/Cart/actions';

import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate, Navigate } from 'react-router-dom';

const IconWrapper = ({ children }) => {
  return <div className="text-3xl flex justify-center">{children}</div>;
};

const steps = [
  {
    label: 'Item',
    icon: (
      <IconWrapper>
        <FaCartPlus />
      </IconWrapper>
    ),
  },
  {
    label: 'Address',
    icon: (
      <IconWrapper>
        <FaAddressCard />
      </IconWrapper>
    ),
  },
  {
    label: 'Confirmation',
    icon: (
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
    ),
  },
];

const columns = [
  {
    Header: 'Product Name',
    accessor: (item) => (
      <div className="flex items-center">
        <img
          src={`${config.api_host}/upload/${item.image_url}`}
          width={48}
          alt={item.name}
        />
        {item.name}
      </div>
    ),
  },
  {
    Header: 'Quantity',
    accessor: 'qty',
  },
  {
    Header: 'Price',
    id: 'price',
    accessor: (item) => <span> @ {formatRupiah(item.price)} </span>,
  },
  {
    Header: 'Total',
    id: 'subtotal',
    accessor: (item) => {
      return <div>{formatRupiah(item.price * item.qty)}</div>;
    },
  },
];

const addressColumns = [
  {
    Header: 'Address Name',
    accessor: (address) => {
      // eslint-disable-next-line no-lone-blocks
      {
        /* address refers to backend model */
      }
      return (
        <div>
          {address.name} <br />
          <small>
            {address.province}, {address.regency}, {address.district},{' '}
            {address.village} <br />
            {address.detail}
          </small>
        </div>
      );
    },
  },
];

export const Checkout = () => {
  let [activeStep, setActiveStep] = React.useState(0);
  let cart = useSelector((state) => state.cart);
  let [selectedAddress, setSelectedAddress] = React.useState(null);
  let { data, status, limit, page, count, setPage } = useAddressData();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleCreateOrder = async () => {
    let payload = {
      delivery_fee: config.global_ongkir,
      delivery_address: selectedAddress._id,
    };

    let { data } = await createOrder(payload);

    // console.log(data);

    if (data?.error) return;

    navigate(`/invoice/${data._id}`, { replace: true }); // { replace: true } for disable the back page history
    dispatch(clearItems());
  };

  if (!cart.length && status === 'process') {
    // without adding && status === 'process' the return <Navigate to='/' /> command will be execute first before navigate(`/invoice/${data._id}`, { replace: true }) command
    // console.log('tes');
    return <Navigate to="/" />;
  }

  // console.log(status);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <Text as="h3"> Checkout </Text>
      <Steps steps={steps} active={activeStep} />
      {activeStep === 0 ? (
        <div>
          <br />
          <br />
          <Table
            items={cart}
            columns={columns}
            perPage={cart.length}
            showPagination={false}
          />

          <br />

          <div className="text-right">
            <Text as="h4">Subtotal: {formatRupiah(sumPrice(cart))}</Text>

            <br />

            <Button
              onClick={() => setActiveStep(activeStep + 1)}
              color="red"
              iconAfter={<FaArrowRight />}
            >
              Forward
            </Button>
          </div>
        </div>
      ) : null}

      {activeStep === 1 ? (
        <div>
          <br />
          <br />
          <Table
            items={data}
            columns={addressColumns}
            perPage={limit}
            page={page}
            onPageChange={(page) => setPage(page)}
            totalItems={count}
            isLoading={status === 'process'}
            selectable
            primaryKey={'_id'}
            selectedRow={selectedAddress}
            onSelectRow={(item) => setSelectedAddress(item)}
          />

          {!data.length && status === 'success' ? (
            <div className="text-center my-10">
              <Link to="/delivery-addresses/add">
                You don't have any delivery address yet <br /> <br />
                <Button> Add address </Button>
              </Link>
            </div>
          ) : null}

          <br />
          <br />

          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Back
              </Button>
            </div>

            <div className="text-right">
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={!selectedAddress}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                Forward
              </Button>
            </div>
          </Responsive>
        </div>
      ) : null}

      {activeStep === 2 ? (
        <div>
          <br />
          <br />
          <Table
            columns={[
              {
                Header: '',
                accessor: 'label',
              },
              {
                Header: '',
                accessor: 'value',
              },
            ]}
            items={[
              {
                label: 'Address',
                value: (
                  <div>
                    {selectedAddress.name} <br />
                    {selectedAddress.province}, {selectedAddress.regency},
                    {selectedAddress.district}, {selectedAddress.village} <br />
                    {selectedAddress.detail}
                  </div>
                ),
              },
              { label: 'Subtotal', value: formatRupiah(sumPrice(cart)) },
              {
                label: 'Shipping Cost',
                value: formatRupiah(config.global_ongkir),
              },
              {
                label: 'Total',
                value: (
                  <b>
                    {formatRupiah(
                      sumPrice(cart) + parseInt(config.global_ongkir)
                    )}
                  </b>
                ),
              },
            ]}
            showPagination={false}
          />

          <br />
          <br />

          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Back
              </Button>
            </div>

            <div className="text-right">
              <Button
                onClick={handleCreateOrder}
                color="red"
                size="large"
                iconAfter={<FaRegCheckCircle />}
              >
                Pay
              </Button>
            </div>
          </Responsive>
        </div>
      ) : null}
      {/* <button onClick={() => setActiveStep(0)}> ke langkah pertama </button>
      <button onClick={() => setActiveStep(1)}> ke langkah kedua </button>
      <button onClick={() => setActiveStep(2)}> ke langkah ketiga </button>
      <br />
      <br />
      <button onClick={() => setActiveStep(activeStep - 1)}>
        ke langkah sebelumnya
      </button>
      <button onClick={() => setActiveStep(activeStep + 1)}>
        ke langkah berikutnya
      </button>
      {activeStep === 0 ? <div> Langkah pertama </div> : null}
      {activeStep === 1 ? <div> Langkah kedua </div> : null}
      {activeStep === 2 ? <div> Langkah ketiga </div> : null} */}
    </LayoutOne>
  );
};
