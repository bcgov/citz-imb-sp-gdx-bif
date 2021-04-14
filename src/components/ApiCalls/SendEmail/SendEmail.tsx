import { RestCall } from '../RestCall/RestCall';

interface ISendEmailProps {
  to: any;
  subject: string;
  body: string;
  from?: any;
  cc?: any;
  bcc?: any;
}

export const SendEmail = async ({
  to,
  subject,
  body,
  from,
  cc = [],
  bcc = [],
}: ISendEmailProps) => {
  const endPoint = '/_api/SP.Utilities.Utility.SendEmail';

  if (!Array.isArray(to)) to = [to];

  const restBody:any = {
    properties: {
      __metadata: {
        type: 'SP.Utilities.EmailProperties',
      },
      To: {
        results: to,
      },
      Body: body,
      Subject: subject,
      CC: {
        results: cc,
      },
      BCC: {
        results: bcc,
      },
    },
  };

  if (from) restBody.properties.From = from;

  const response = await RestCall({
    endPoint,
    method: 'post',
    body: restBody,
  });

  return response.d;
};
