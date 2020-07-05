/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, Dimensions, Alert} from 'react-native';
import styled from 'styled-components/native';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

import colors from '../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase, {firestore} from '../firebase/firebase';

export default function Chat({route}) {
  const {groupInfo} = route.params;
  const currentUser = firebase.auth().currentUser;
  const [useJoined, setUserJoined] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [showEmoji, setShowEmoji] = React.useState(false);
  const sendMessage = async () => {
    const messageRef = firestore
      .collection('message')
      .doc(groupInfo.id)
      .collection('messages')
      .doc();
    await messageRef.set({
      messageId: messageRef.id,
      message,
      senderEmail: currentUser.email,
      senderId: currentUser.uid,
    });
    setMessage('');
  };
  React.useEffect(() => {
    isUserJoined();
  }, []);
  React.useEffect(() => {
    setLoading(true);
    firestore
      .collection('message')
      .doc(groupInfo.id)
      .collection('messages')
      .onSnapshot(function(querySnapshot) {
        const tempMessages = [];
        querySnapshot.forEach(function(doc) {
          tempMessages.push(doc.data());
        });
        setMessages(tempMessages);
      });
    setLoading(false);
  }, []);
  const isUserJoined = () => {
    firestore
      .collection('members')
      .doc(groupInfo.id)
      .collection('member')
      .where('userId', '==', currentUser.uid)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function(doc) {
            if (doc.data() !== null) {
              setUserJoined(true);
            } else {
              joinGroup();
            }
          });
        } else {
          joinGroup();
        }
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  };
  const joinGroup = () => {
    Alert.alert(
      'Join Group',
      'Are you sure you want to join',
      [
        {
          text: 'YES',
          onPress: () => {
            const memberRef = firestore
              .collection('members')
              .doc(groupInfo.id)
              .collection('member')
              .doc();
            memberRef.set({userId: currentUser.uid}).then(() => {
              Alert.alert('joined successfully');
              setUserJoined(true);
            });
          },
        },
        {
          text: 'NO',
          onPress: () => {
            setUserJoined(false);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const renderMessage = item => {
    if (item.senderId === currentUser.uid) {
      return (
        <Message type="me" key={item.messageId}>
          <Text>{item.message}</Text>
        </Message>
      );
    } else {
      return (
        <Other key={item.messageId}>
          <OtherThumbnail>
            <Icon
              source={{
                uri: 'https://img.icons8.com/small/16/000000/filled-sent.png',
              }}
            />
          </OtherThumbnail>
          <Message type="other">
            <Text>{item.message}</Text>
          </Message>
        </Other>
      );
    }
  };
  return (
    <Container>
      {loading ? (
        <Loader size="large" color={colors.uaStudiosGreen} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.map(item => renderMessage(item))}
        </ScrollView>
      )}
      {showEmoji && (
        <EmojiSelector
          showSearchBar={false}
          showSectionTitles={false}
          showHistory={false}
          category={Categories.symbols}
          onEmojiSelected={emoji => {
            setShowEmoji(false);
            setMessage(msg => msg + emoji);
          }}
        />
      )}
      {useJoined && (
        <Content>
          <TouchableOpacity
            onPress={() => setShowEmoji(true)}
            activeOpacity={1}>
            <EmojiIcon>&#128512;</EmojiIcon>
          </TouchableOpacity>
          <TextField
            textBreakStrategy="balanced"
            textAlignVertical="center"
            multiline
            autoCapitalize="none"
            autoCompleteType="off"
            value={message}
            placeholder="Enter message"
            placeholderTextColor={colors.black}
            onChangeText={text => setMessage(text)}
          />
          <TouchableOpacity activeOpacity={1} onPress={sendMessage}>
            <SendIcon
              source={{
                uri: 'https://img.icons8.com/small/16/000000/filled-sent.png',
              }}
            />
          </TouchableOpacity>
        </Content>
      )}
    </Container>
  );
}

const Loader = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  padding-top: 10px;
  flex: 1;
`;

const Message = styled.View`
  border-color: ${colors.lighishGray};
  border-width: 0.5px;
  margin: 5px 0;
  padding: 10px;
  ${({type}) => {
    if (type === 'me') {
      return `
            align-self:flex-end;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            margin-left: 96px;
            `;
    }
    return `
            align-self:flex-start;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            margin-right: 96px;`;
  }}
`;

const TextField = styled.TextInput`
  height: 50px;
  padding-left: 20px;
  justify-content: center;
  align-self: stretch;
  flex: 1;
`;

const Content = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-width: 1px;
  border-color: ${colors.lighishGray};
  width: ${Dimensions.get('window').width}px;
  bottom: 30px;
  z-index: 1;
  align-items: center;
  background-color: #ddd;
`;

const SendIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Other = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const OtherThumbnail = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.lighishGray};
  overflow: hidden;
  margin-right: 2px;
`;

const EmojiIcon = styled(Text)`
  font-size: 30px;
  margin-left: 10px;
`;
