(function (global) {

  global.validators = {
    dni: v => /^[0-9]{8}$/.test(v),
    phone: v => /^[0-9]{9}$/.test(v),
    email: v => /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,}$/.test(v),
    required: v => v !== null && v !== "",
    checked: v => v === true
  };

})(window);
