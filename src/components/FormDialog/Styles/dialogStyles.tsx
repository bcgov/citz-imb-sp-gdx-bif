import React from 'react';

export const dialogStyles = (status: string) => {
  switch (status) {
    case 'New':
      return {
        main: {
          background: 'white',
        },
      };

    case 'Submitted':
      return {
        main: {
          background: '#bae1ff',
        },
      };

    case 'Approved':
      return {
        main: {
          background: '#baffc9',
        },
      };

    case 'Rejected':
      return {
        main: {
          background: '#ffb3ba',
        },
      };
  }
};
