import * as Yup from 'yup';

export const formSchema = (columns: any) => {
  console.log(`columns`, columns);
  let tempSchema: any = {};
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].fieldTypeKind === 20) {
      if (columns[i].required) {
        tempSchema[columns[i].fieldName] = Yup.array()
          .min(1)
          .required(columns[i].name + ' is required');
      }
    } else {
      if (columns[i].required) {
        tempSchema[columns[i].fieldName] = Yup.string().required(
          columns[i].name + ' is required'
        );
      }
    }
  }
  return Yup.object().shape(tempSchema);
};
