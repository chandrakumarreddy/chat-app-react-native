import React from 'react';
import styled from 'styled-components/native';
import colors from '../utils/colors';

export default function TextInput(props) {
  return (
    <Input
      {...props}
      placeholderTextColor={colors.white}
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
}

const Input = styled.TextInput`
  height: 60px;
  border: 1px solid ${colors.lighishGray};
  padding: 0 20px;
  border-radius: 10px;
  color: white;
`;
