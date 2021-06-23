import * as Yup from 'yup';
import { getFieldMinimumLength } from './getFieldMinimumLength';

export const formSchema = (columns: any) => {
  const tempSchema: any = {};

  for (let i = 0; i < columns.length; i++) {
    if (!columns[i].hideOnForm) {
      switch (columns[i].fieldTypeKind) {
        case 9:
        case 2:
        case 3:
          if (columns[i].required) {
            tempSchema[columns[i].fieldName] = Yup.string()
              .required(`${columns[i].name} is required`)
              .min(
                getFieldMinimumLength(columns[i].fieldName),
                `${columns[i].name} needs to be ${getFieldMinimumLength(
                  columns[i].fieldName
                )} characters`
              );
          } else {
            tempSchema[columns[i].fieldName] = Yup.string().min(
              getFieldMinimumLength(columns[i].fieldName),
              `${columns[i].name} needs to be ${getFieldMinimumLength(
                columns[i].fieldName
              )} characters`
            );
          }
          break;
        case 20:
          if (columns[i].required) {
            tempSchema[columns[i].fieldName] = Yup.array()
              .min(1, `${columns[i].name} is required`)
              .required(`${columns[i].name} is required`);
          }
          break;
        default:
      }
    }
  }
  return Yup.object().shape(tempSchema);
};
