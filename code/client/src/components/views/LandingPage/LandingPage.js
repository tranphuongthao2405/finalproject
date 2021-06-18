/* eslint-disable react/destructuring-assignment */
import React from 'react';

function LandingPage(props) {
  const { role } = props.match.params;
  console.log(role);
  return <></>;
}

export default LandingPage;
