import React from 'react';
import { Formik } from 'formik';

import InnerModal from '../InnerModal/InnerModal';
import EditBtn from '../../buttons/EditBtn/EditBtn';
import DefaultBtn from '../../buttons/DefaultBtn/DefaultBtn';

import s from './AddEditClientModal.module.scss';

// firstName(pin):"Алексей"
// secondName(pin):"Григоренко"
// thirdName(pin):"Романович"
// tel(pin):"+38 066 202 53 90"
// email(pin):"maks2@gmail.com"
// city(pin):"Донецк"
// post(pin):"Новая Почта 42"
// debt(pin):-3006
// updatedAt(pin):"2021-01-10T20:41:14.163Z"

export default function AddEditClientModal({ onCloseModal }) {
  return (
    <InnerModal width={600} onCloseModal={onCloseModal}>
      <Formik
        initialValues={{
          secondName: '',
          firstName: '',
          thirdName: '',
          tel: '',
          email: '',
          city: '',
          post: '',
          debt: '',
        }}
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <form className={s.clientForm} onSubmit={handleSubmit}>
              <label className={s.secondName}>
                <span className={s.labelTitle}>Фамилия*</span>
                <input
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
                <input
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
                handleOnClick={() => console.log('Создать клиента')}
                customClassName={'createClient'}
              />
            </form>
          </>
        )}
      </Formik>
    </InnerModal>
  );
}
