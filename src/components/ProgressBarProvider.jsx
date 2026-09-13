'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#be185d"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
