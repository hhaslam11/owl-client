
import React, { useState } from "react";

import ProgressBar from 'react-bootstrap/ProgressBar'

import './OwlStatus.scss';

export default function Progress() {

  const [state, setState] = useState(1);

  setTimeout(() => setState(state + 1), 1000);
  return (
    <>
    <ProgressBar animated now={state} />
    </>
  )
}