const initialValues = {
  secondName: '',
  firstName: '',
  thirdName: '',
  tel: '',
  email: '',
  city: '',
  post: '',
  debt: 0,
};

const valuesValidator = values => {
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

  if (!/[0-9]/.test(values.debt)) {
    errors.debt = 'Вы ввели не число';
  }
  return errors;
};

export default { initialValues, valuesValidator };
