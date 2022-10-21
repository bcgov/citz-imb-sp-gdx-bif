import React from 'react';

export const dialogStyles = (status: string) => {
  switch (status) {
    case 'Submitted':
      return {
        main: {
          background: 'rgb(0 120 212 / 46%)',
          borderRadius: '10px',
        },
        header: {
          Font: { color: 'red' },
        },
      };

    case 'Approved':
      return {
        main: {
          background: 'linear-gradient(177deg, rgb(7 205 50), transparent)',
          borderRadius: '10px',
        },
      };

    case 'Rejected':
      return {
        main: {
          background:
            'linear-gradient(341deg, rgba(255, 39, 39, 0.99), transparent)',
          borderRadius: '10px',
        },
      };
    default:
      return {
        main: {
          background: 'transparent',
          padding: '20px',
        },
      };
  }
};
