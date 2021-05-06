import * as React from 'react';
import { ProgressIndicator } from '@fluentui/react';
import { ILoader } from '../Interfaces';
export const Loader: React.FC<ILoader> = ({ label, description, styles }) => (
  <ProgressIndicator label={label} description={description} styles={styles} />
);
