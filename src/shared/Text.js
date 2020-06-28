import React from 'react';
import styled from 'styled-components/native';
import colors from '../utils/colors';

export default function TextField(props) {
  return <Text {...props}>{props.children}</Text>;
}

const Text = styled.Text`
  color: ${({color}) => color ?? colors.white};
  font-family: 'Avenir Next';
  ${({large, medium, small, tiny}) => {
    switch (true) {
      case large:
        return 'font-size: 36px';
      case medium:
        return 'font-size: 30px';
      case small:
        return 'font-size: 24px';
      case tiny:
        return 'font-size: 18px';
      default:
        return 'font-size: 14px';
    }
  }};
  ${({center, right}) => {
    switch (true) {
      case center:
        return 'text-align:center';
      case right:
        return 'text-align:right';
      default:
        return 'text-align:left';
    }
  }}
`;
