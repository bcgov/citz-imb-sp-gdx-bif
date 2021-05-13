import { IChangeGroupOwner } from '../../Interfaces';

export const ChangeGroupOwner = ({
  baseurl,
  groupIdentifier,
  ownerIdentifier,
}: IChangeGroupOwner) => {
  const SP = window.SP;

  return new Promise((resolve, reject) => {
    let clientContext: any;
    let group: any;
    let ownerGroup: any;

    if (baseurl) {
      clientContext = new SP.ClientContext(baseurl);
    } else {
      clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
    }

    //The group you want to set as the owner
    if (typeof ownerIdentifier === 'string') {
      ownerGroup = clientContext
        .get_web()
        .get_siteGroups()
        .getByName(ownerIdentifier);
    } else {
      ownerGroup = clientContext
        .get_web()
        .get_siteGroups()
        .getById(ownerIdentifier);
    }

    //The group you want the owner set for
    if (typeof groupIdentifier === 'string') {
      group = clientContext
        .get_web()
        .get_siteGroups()
        .getByName(groupIdentifier);
    } else {
      group = clientContext.get_web().get_siteGroups().getById(groupIdentifier);
    }
    group.set_owner(ownerGroup);
    // Update Group
    group.update();
    // Execute the query to the server.

    const onsuccess = (OwnerSetResp: any) => {
      resolve(OwnerSetResp);
    };

    const onfailed = (sender: any, args: any) => {
      reject(args);
      console.log('Failed' + args.get_message() + '\n' + args.get_stackTrace());
    };
    clientContext.executeQueryAsync(onsuccess, onfailed);
  });
};
