import React from 'react';
import styled from 'styled-components/native';
import {Keyboard, Alert} from 'react-native';
import TextInput from '../shared/TextInput';
import Text from '../shared/Text';
import Button from '../shared/Button';
import colors from '../utils/colors';
import constants from '../utils/constants';
import DismissKeyboard from '../shared/DismissKeyboard';
import firebase, {firestore} from '../firebase/firebase';

export default function AddGroup({navigation}) {
  const [name, setName] = React.useState('');
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (name) {
      const groupRef = firestore.collection('groups').doc();
      try {
        await groupRef.set({
          groupId: groupRef.id,
          groupName: name,
          userId: firebase.auth().currentUser.uid,
          thumbnail: 'https://picsum.photos/300/300.jpg',
        });
        const memberRef = firestore
          .collection('members')
          .doc(groupRef.id)
          .collection('member')
          .doc();
        await memberRef.set({userId: firebase.auth().currentUser.uid});
        return navigation.navigate('Groups');
      } catch (error) {
        console.log(error.message);
      }
    }
    return Alert.alert('Enter valid name');
  };
  return (
    <KeyboardAvoidingView
      behavior={constants.os === 'ios' ? 'padding' : 'height'}>
      <DismissKeyboard>
        <Container>
          <Text medium bold>
            Add Group
          </Text>
          <GroupNameField
            placeholder="Enter group name"
            onChangeText={text => setName(text)}
          />
          <Submit onPress={handleSubmit}>Submit</Submit>
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
  align-items: center;
  justify-content: center;
  background-color: ${colors.black};
`;

const GroupNameField = styled(TextInput)`
  margin-top: 20px;
  width: ${constants.screenWidth * 0.8}px;
`;

const Submit = styled(Button)`
  background-color: ${colors.uaStudiosGreen};
  width: ${constants.screenWidth * 0.8}px;
  margin-top: 16px;
  padding: 16px;
`;
