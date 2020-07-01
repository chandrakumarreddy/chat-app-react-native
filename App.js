import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import React from 'react';
import Main from './src/navigation/Main';

export default function App() {
  return <Main />;
}
