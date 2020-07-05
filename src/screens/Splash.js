import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import firebase from '../firebase/firebase';

export default function SplashScreen({navigation}) {
  React.useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          navigation.reset({index: 0, routes: [{name: 'Groups'}]});
        } else {
          navigation.reset({index: 0, routes: [{name: 'Signup'}]});
        }
      });
    }, 1000);
  });
  return (
    <Container>
      <Cover>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png',
          }}
          resizeMode="contain"
        />
      </Cover>
      <Content>
        <LottieView source={require('../lottefiles/chat.json')} autoPlay loop />
      </Content>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Cover = styled.View`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  width: 100%;
  flex: 1;

  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
