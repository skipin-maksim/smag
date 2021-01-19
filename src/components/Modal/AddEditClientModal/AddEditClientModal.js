import React, { useCallback } from 'react';
import { Formik } from 'formik';
import formikConfig from './initialValuesFormik';
import InputMask from 'react-input-mask';

import InnerModal from '../InnerModal/InnerModal';
import EditBtn from '../../buttons/EditBtn/EditBtn';
import DefaultBtn from '../../buttons/DefaultBtn/DefaultBtn';

import s from './AddEditClientModal.module.scss';
import { useDispatch } from 'react-redux';
import { clientsOperations } from '../../../redux/clients';

export default function AddEditClientModal({ onCloseModal }) {
  const dispatch = useDispatch();

  const onCreateClient = useCallback(
    clientData => dispatch(clientsOperations.createClient(clientData)),
    [dispatch],
  );

  return (
    <InnerModal
      width={600}
      onCloseModal={onCloseModal}
      title={'Создание нового клиента'}
    >
      <Formik
        initialValues={formikConfig.initialValues}
        validate={values => formikConfig.valuesValidator(values)}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          const data = await onCreateClient(values);

          if (data.code === 201) onCloseModal();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <EditBtn
              data={false}
              onEdit={() => {
                console.log('Включить!! Изменение клиента');
              }}
              isEdit={true}
            />
            <form className={s.clientForm} onSubmit={handleSubmit} noValidate>
              <label className={s.secondName}>
                <span className={s.labelTitle}>Фамилия*</span>
                <input
                  autoComplete={'off'}
                  type="text"
                  name="secondName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secondName}
                />
                <span className={s.error}>
                  {errors.secondName && touched.secondName && errors.secondName}
                </span>
              </label>

              <label className={s.firstName}>
                <span className={s.labelTitle}>Имя*</span>
                <input
                  autoComplete={'off'}
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <span className={s.error}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </span>
              </label>

              <label className={s.thirdName}>
                <span className={s.labelTitle}>Отчество</span>
                <input
                  autoComplete={'off'}
                  type="text"
                  name="thirdName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.thirdName}
                />
                <span className={s.error}>
                  {errors.thirdName && touched.thirdName && errors.thirdName}
                </span>
              </label>

              <label className={s.tel}>
                <span className={s.labelTitle}>Телефон*</span>
                <InputMask
                  mask="+99 (999) 999 99 99"
                  autoComplete={'off'}
                  type="tel"
                  name="tel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tel}
                />
                <span className={s.error}>
                  {errors.tel && touched.tel && errors.tel}
                </span>
              </label>

              <label className={s.email}>
                <span className={s.labelTitle}>E-mail</span>
                <input
                  autoComplete={'off'}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className={s.error}>
                  {errors.email && touched.email && errors.email}
                </span>
              </label>

              <label className={s.city}>
                <span className={s.labelTitle}>Город*</span>
                <input
                  autoComplete={'off'}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                <span className={s.error}>
                  {errors.city && touched.city && errors.city}
                </span>
              </label>

              <label className={s.post}>
                <span className={s.labelTitle}>Инфо. по доставке*</span>
                <input
                  autoComplete={'off'}
                  type="text"
                  name="post"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.post}
                />
                <span className={s.error}>
                  {errors.post && touched.post && errors.post}
                </span>
              </label>

              <label className={s.debt}>
                <span className={s.labelTitle}>Долг</span>
                <input
                  autoComplete={'off'}
                  type="number"
                  name="debt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.debt}
                />
                <span className={s.error}>
                  {errors.debt && touched.debt && errors.debt}
                </span>
              </label>

              <DefaultBtn
                text={'Создать'}
                type={'submit'}
                customClassName={'createClient'}
              />
            </form>
          </>
        )}
      </Formik>
    </InnerModal>
  );
}
