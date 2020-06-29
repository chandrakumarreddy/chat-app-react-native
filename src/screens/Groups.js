import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

export default function Groups({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button>
          <Image
            source={{
              uri:
                'https://img.icons8.com/ios/30/000000/logout-rounded-left.png',
            }}
          />
        </Button>
      ),
      headerRight: () => (
        <Button>
          <Image
            source={{
              uri: 'https://img.icons8.com/pastel-glyph/64/000000/plus.png',
            }}
          />
        </Button>
      ),
    });
  }, [navigation]);
  return (
    <Container>
      <Text>Groups</Text>
    </Container>
  );
}

const Container = styled.View``;
const Text = styled.Text``;
const Button = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
