import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const createProjSchema = Yup.object().shape({
  //Example
  //Title: Yup.string().required("Project Name is required"),
});

export const IntakeForm = ({ columns }: any) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {}}
      validationSchema={createProjSchema}
    >
      {({
        setFieldValue,
        values,
        errors,
        touched,
        setFieldTouched,
        handleChange,
        handleBlur,
      }) => {
        return (
          <Form>
            {columns.map((column: any) => {
              return column.fieldRender;
            })}
          </Form>
        );
      }}
    </Formik>
  );
};
