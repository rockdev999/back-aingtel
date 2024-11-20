import { useState } from "react";
function UseForm(initialState) {
  const [form, setForm] = useState(initialState);

  function dataForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    const copy = { ...form, [name]: value };
    setForm(copy);
  }
  const resetForm = () => {
    setForm(initialState);
  };
  return {
    form,
    dataForm,
    resetForm,
  };
}

export default UseForm;
// actualizado
