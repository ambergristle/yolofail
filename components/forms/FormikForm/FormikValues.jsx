import { useFormikContext } from "formik";

// display form values for testing
const FormikValues = () => {
  const { values, isValid } = useFormikContext();

  return (
    <>
      <div>{`${isValid}`}</div>
      <div>{JSON.stringify(values, null, 2)}</div>
    </>
  );
};

export default FormikValues;
