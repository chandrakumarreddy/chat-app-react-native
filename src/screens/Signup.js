import React from 'react';
import {StatusBar, Platform} from 'react-native';
import styled from 'styled-components/native';
import colors from '../utils/colors';
import Text from '../shared/Text';
import TextInput from '../shared/TextInput';
import strings from '../utils/strings';
import constants from '../utils/constants';
import DismissKeyboard from '../shared/DismissKeyboard';
import Button from '../shared/Button';
import Utility from '../utils/utility';
import firebase from '../firebase/firebase';

export default function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [error, setError] = React.useState('');
  const validateEmail = text => {
    if (!Utility.isEmailValid(email)) {
      return setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };
  const handleSubmit = async () => {
    if (!emailError || !password) {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Groups'}],
            });
          })
          .catch(err => {
            if (err.code === 'auth/wrong-password') {
              return setError('Invalid credentails');
            }
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Groups'}],
                });
              })
              .catch(err1 => {
                setError(err1.message);
              });
          });
      } catch (err2) {
        setError(err2.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <DismissKeyboard>
        <Container>
          <StatusBar barStyle="light-content" />
          <Cover>
            <Title large>Chat App</Title>
            <Error small>{error}</Error>
          </Cover>
          <Content>
            <EmailField
              placeholder={strings.emailPlaceholder}
              onChangeText={text => {
                setEmail(text);
              }}
              autoCa
              value={email}
              keyboardType="email-address"
              onEndEditing={validateEmail}
            />
            {!!emailError && <Error tiny>{emailError}</Error>}
            <PasswordField
              placeholder={strings.passwordPlaceholder}
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
            />
            <JoinNow onPress={handleSubmit}>{strings.joinNow}</JoinNow>
          </Content>
        </Container>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
}

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.theme};
`;

const Cover = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Title = styled(Text)``;

const Content = styled.View`
  align-items: center;
  flex: 1;
  margin: 0 20px;
`;

const EmailField = styled(TextInput)`
  width: ${constants.screenWidth - 40}px;
`;

const Error = styled(Text)`
  color: red;
  width: ${constants.screenWidth - 40}px;
  padding: 10px 20px 0 20px;
`;

const PasswordField = styled(TextInput)`
  margin-top: 20px;
  width: ${constants.screenWidth - 40}px;
`;

const JoinNow = styled(Button)`
  margin-top: 20px;
  background-color: ${colors.uaStudiosGreen};
  padding: 16px;
  width: ${constants.screenWidth - 40}px;
`;
