import React from 'react';
import styled from 'styled-components/native';
import Text from './Text';

export default function Button(props) {
  return (
    <Container {...props} activeOpacity={1}>
      <Text center tiny>
        {props.children}
      </Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  border-radius: 10px;
`;
