import React from 'react';

const RadioGroup = ({ label, children }) => {
  return (
    <fieldset style={{margin: '0px 10px'}}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};

export default RadioGroup;