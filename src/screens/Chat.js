/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import firebase, {firestore} from '../firebase/firebase';

import colors from '../utils/colors';
import Text from '../shared/Text';

export default function Chat({route, navigation}) {
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
    navigation.setOptions({
      title: groupInfo.name,
    });
    isUserJoined();
  }, []);
  React.useEffect(() => {
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
  }, []);
  const isUserJoined = () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
          <Text color={colors.black}>{item.message}</Text>
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
            <Text color={colors.black}>{item.message}</Text>
          </Message>
        </Other>
      );
    }
  };
  if (loading) {
    return (
      <Container>
        <LottieView
          source={require('../lottefiles/loading.json')}
          autoPlay
          loop
        />
      </Container>
    );
  } else if (useJoined) {
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
  } else {
    return (
      <Container>
        <LotteContainer>
          <LottieView
            source={require('../lottefiles/join-chat.json')}
            autoPlay
            loop
          />
        </LotteContainer>
        <Description tiny>
          When you are part of a group, you meet several others who hear your
          goals – and can encourage you to stay motivated to reach them. Many
          times, the group setting can give more natural encouragement,
          motivation, and advice than could ever happen in an individual
          counseling appointment.
        </Description>
      </Container>
    );
  }
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

const LotteContainer = styled.SafeAreaView`
  width: 100%;
  height: 50%;
`;

const Description = styled(Text)`
  margin: 32px;
  color: ${colors.black};
  font-weight: 300;
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
  width: 100%;
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
