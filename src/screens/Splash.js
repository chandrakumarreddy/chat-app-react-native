import React from 'react';
import styled from 'styled-components/native';
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
      <Image
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png',
        }}
        resizeMode="contain"
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
