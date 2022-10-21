import React from 'react';

export const formStyles = (status: string) => {
  switch (status) {
    case 'Submitted':
    case 'Approved':
    case 'Rejected':
      return {
        background: '#fff',
        padding: '20px',
      };

    default:
      return {
        background: '#fff',
        padding: '20px',
      };
  }
};
