//https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
import { NumberField, PeoplePicker } from "./index";
export const RenderInputs = (fieldType: any, fieldName: any) => {
  switch (fieldType) {
    case 2: //Text
      //example
      // <SingleLineTextField label={title} name={internalName} toolTip={description} required={required} />

      return <PeoplePicker fieldName={fieldName} />;

      break;
    case 3: //"Note"
      return <div>Description Field PlaceHolder</div>;

      break;
    case 9: //"Number"
      return <NumberField fieldName={fieldName} />;

      break;
    case 4: //"DateTime":
      return <div>Date Field PlaceHolder</div>;

      break;
    case 15: //"Choice":
      return <div>Choice Field PlaceHolder</div>;

      break;
    case 20: //"User":
      return <div>User Field PlaceHolder</div>;

      break;

    default:
      return <div>default render</div>;
      break;
  }
};
