import React from 'react';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

export const EnsureUserLoader = ({ loaderMessage }: any) => {
  return (
    <ProgressIndicator
      styles={{ root: { position: 'absolute', width: '300px' } }}
      label={'ㅤ'} //  <== this is an invisible charcter used just to fill in the space where the label is.  You could use CSS as well
    />
  );
};
