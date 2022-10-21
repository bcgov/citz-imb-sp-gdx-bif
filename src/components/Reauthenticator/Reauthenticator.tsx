import React from 'react';
import { Modal } from '@fluentui/react';
import Iframe from 'react-iframe';

export const Reauthenticator = () => {
  return (
    <Modal
      isOpen={true}
      isBlocking={false}
      styles={{
        main: {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Iframe
        url='https://sts.gov.bc.ca/adfs/ls?wa=wsignin1.0&wtrealm=urn%3asp.gov.bc.ca&wctx=https%3a%2f%2fcitz.sp.gov.bc.ca%2fsites%2fShared%2fProgram%2fSP%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252Fsites%252FShared%252FProgram%252FSP%252F&wreply=https%3a%2f%2fcitz.sp.gov.bc.ca%2f_trust%2fDefault.aspx'
        width='100%'
        height='100%'
        id='myId'
        className='myClassname'
        position='absolute'
        display='block'
      />
    </Modal>
  );
};
