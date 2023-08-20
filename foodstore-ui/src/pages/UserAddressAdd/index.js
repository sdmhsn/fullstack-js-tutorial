import React from 'react';

import { rules } from './validation';
import { TopBar } from '../../components/TopBar';
import { SelectWilayah } from '../../components/SelectWilayah';
import { createAddress } from '../../api/address';

import { LayoutOne, InputText, FormControl, Textarea, Button } from 'upkit';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

export const UserAddressAdd = () => {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    // setError,
  } = useForm();
  // console.log(getValues());
  let allFields = watch();
  // console.log(allFields);
  // console.log(register());
  // console.log(getValues());

  React.useEffect(() => {
    register('province', rules.province);
    register('regency', rules.regency);
    register('district', rules.district);
    register('district', rules.district);
    register('village', rules.village);
  }, [register]);

  React.useEffect(() => {
    setValue('regency', null);
    setValue('district', null);
    setValue('village', null);
  }, [allFields.province, setValue]);

  React.useEffect(() => {
    setValue('district', null);
    setValue('village', null);
  }, [allFields.regency, setValue]);

  React.useEffect(() => {
    setValue('village', null);
  }, [allFields.district, setValue]);

  let updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    let payload = {
      name: formData.address_name,
      detail: formData.detail,
      province: formData.province.label,
      regency: formData.regency.label,
      district: formData.district.label,
      village: formData.village.label,
    };

    console.log(payload);

    let { data } = await createAddress(payload);

    if (data.error) return;

    navigate('/delivery-addresses');
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Address Name"
            errorMessage={errors.address_name?.message}
            color="black"
          >
            <InputText
              placeholder="Address Name"
              fitContainer
              name="address_name"
              //   ref={register(rules.address_name)}
              {...register('address_name', rules.address_name)}
              // value={getValues().address_name}
            />
          </FormControl>

          <FormControl
            label="Province"
            errorMessage={errors.province?.message}
            color="black"
          >
            <SelectWilayah
              onChange={(option) => updateValue('province', option)}
              name="province"
              value={getValues().province}
            />
          </FormControl>

          <FormControl
            label="Regency"
            errorMessage={errors.regency?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="regencies"
              kodeInduk={getValues().regency?.value}
              onChange={(option) => updateValue('regency', option)}
              value={getValues().regency}
            />
          </FormControl>

          <FormControl
            label="District"
            errorMessage={errors.district?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="districts"
              kodeInduk={getValues().district?.value}
              onChange={(option) => updateValue('district', option)}
              value={getValues().district}
            />
          </FormControl>

          <FormControl
            label="Village"
            errorMessage={errors.village?.message}
            color="black"
          >
            <SelectWilayah
              tingkat="villages"
              kodeInduk={getValues().village?.value}
              onChange={(option) => updateValue('village', option)}
              value={getValues().village}
            />
          </FormControl>

          <FormControl
            label="Detail alamat"
            errorMessage={errors.detail?.message}
            color="black"
          >
            <Textarea
              placeholder="Detail Address"
              fitContainer
              name="detail"
              //   ref={register(rules.detail_alamat)}
              {...register('detail', rules.detail)}
            />
          </FormControl>

          <Button fitContainer>Save</Button>
        </form>
      </div>
    </LayoutOne>
  );
};
