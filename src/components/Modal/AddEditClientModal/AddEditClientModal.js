import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';

import InnerModal from '../InnerModal/InnerModal';
import EditBtn from '../../buttons/EditBtn/EditBtn';
import DefaultBtn from '../../buttons/DefaultBtn/DefaultBtn';

import s from './AddEditClientModal.module.scss';
import { useDispatch } from 'react-redux';
import { clientsOperations } from '../../../redux/clients';

const initialValues = {
  secondName: '',
  firstName: '',
  thirdName: '',
  tel: '',
  email: '',
  city: '',
  post: '',
  debt: '0',
};

export default function AddEditClientModal({
  onCloseModal,
  clientInfo = initialValues,
}) {
  const isDisabled = clientInfo.secondName !== '' ? true : false;
  const [isEdit, setIsEdit] = useState(isDisabled);

  const dispatch = useDispatch();

  const onCreateClient = useCallback(
    clientData => dispatch(clientsOperations.createClient(clientData)),
    [dispatch],
  );

  const toggleIsEdit = () => setIsEdit(!isEdit);

  return (
    <InnerModal
      width={600}
      onCloseModal={onCloseModal}
      title={'Создание нового клиента'}
    >
      <Formik
        initialValues={clientInfo}
        validate={values => {
          const errors = {};
          if (!values.secondName) {
            errors.secondName = 'Обязательное поле';
          }
          if (!values.firstName) {
            errors.firstName = 'Обязательное поле';
          }
          if (!values.tel) {
            errors.tel = 'Обязательное поле';
          }
          if (!values.city) {
            errors.city = 'Обязательное поле';
          }
          if (!values.post) {
            errors.post = 'Обязательное поле';
          }
          // if (values.debt.includes('e')) {
          //   errors.debt = 'Вы ввели не число';
          // }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          const data = await onCreateClient(values);
          // TODO тут написать проверку: мы изменяем или создаем? Ипрописать операцию изменения

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
            <EditBtn data={false} onEdit={toggleIsEdit} isEdit={isEdit} />

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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                  disabled={isEdit}
                />
                <span className={s.error}>
                  {errors.thirdName && touched.thirdName && errors.thirdName}
                </span>
              </label>

              <label className={s.tel}>
                <span className={s.labelTitle}>Телефон*</span>
                <input
                  autoComplete={'off'}
                  type="tel"
                  name="tel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tel}
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                  disabled={isEdit}
                />
                <span className={s.error}>
                  {errors.debt && touched.debt && errors.debt}
                </span>
              </label>

              <DefaultBtn
                text={'Создать'}
                type={'submit'}
                customClassName={'createClient'}
                isEdit={isEdit}
              />
            </form>
          </>
        )}
      </Formik>
    </InnerModal>
  );
}
