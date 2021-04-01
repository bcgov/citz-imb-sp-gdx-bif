import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RenderInputs } from "./Inputs/RenderInputs";
const createProjSchema = Yup.object().shape({
  //Example
  //Title: Yup.string().required("Project Name is required"),
});

export const IntakeForm = ({ columns }: any) => {
  return (
    <Formik
      initialValues={{ Ministry: "noneee" }}
      onSubmit={(value: any) => {
        console.log(`value`, value);
      }}
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
              return RenderInputs(column.FieldTypeKind, column.fieldName);
              // return column.fieldRender;
            })}
            <button>test</button>
          </Form>
        );
      }}
    </Formik>
  );
};
