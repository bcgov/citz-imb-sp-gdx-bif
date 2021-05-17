import React from 'react';

export const dialogStyles = (status: string) => {
  switch (status) {
    case 'New':
      return {
        main: {
          background: 'white',
          borderRadius: '10px',
        },
      };

    case 'Submitted':
      return {
        main: {
          background:
            'linear-gradient(135deg, rgb(233 245 255), rgb(0 120 212))',
          borderRadius: '10px',
        },
        header: {
          Font: { color: 'red' },
        },
      };

    case 'Approved':
      return {
        main: {
          background: '#baffc9',
          borderRadius: '10px',
        },
      };

    case 'Rejected':
      return {
        main: {
          background: '#ffb3ba',
          borderRadius: '10px',
        },
      };
  }
};
