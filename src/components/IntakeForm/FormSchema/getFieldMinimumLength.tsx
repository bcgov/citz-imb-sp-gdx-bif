export const getFieldMinimumLength: any = (fieldName: string) => {
  switch (fieldName) {
    case 'Division':
      return null;
    case 'Ministry':
      return null;
    case 'Title':
      return null;
    case 'CASClient':
      return 3;
    case 'CASResp':
      return 5;
    case 'CASServ':
      return 5;
    case 'CASSToB':
      return 4;
    case 'CASProj':
      return 7;
    case 'ClientNumber':
      return 4;
    case 'Status':
      return null;
    case 'Author':
      return null;
    case 'Status':
      return null;
    default:
      return null;
  }
};
