/* // Validator.js
const validator = (data) => {
  const errors = {};

  // Validación del nombre
  if (!data.email) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "El correo electrónico no es válido";
  }


  // Validación de la altura
  if (!data.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (data.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }
  
  return errors;
};

export default validator; */
