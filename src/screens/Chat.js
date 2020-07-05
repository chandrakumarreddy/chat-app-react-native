import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../utils/colors';

export default function Chat() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Message type="me">
          <Text>
            This is chandra. How are you. What is the status.This is chandra.
            How are you. What is the status
          </Text>
        </Message>
        {[1, 2, 3].map(item => (
          <Other key={item}>
            <OtherThumbnail>
              <Icon
                source={{
                  uri: 'https://img.icons8.com/small/16/000000/filled-sent.png',
                }}
              />
            </OtherThumbnail>
            <Message type="other">
              <Text>
                This is Reddy. How are you. What is the status.This is chandra.
                How are you. What is the status
              </Text>
            </Message>
          </Other>
        ))}
      </ScrollView>
      <Content>
        <TextField
          placeholder="Enter message"
          placeholderTextColor={colors.black}
        />
        <SendIcon
          source={{
            uri: 'https://img.icons8.com/small/16/000000/filled-sent.png',
          }}
        />
      </Content>
    </Container>
  );
}

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
  border-color: ${colors.lighishGray};
  height: 50px;
  padding-left: 20px;
  border-radius: 25px;
  border-width: 1px;
  align-self: stretch;
`;

const Content = styled.View`
  position: absolute;
  position: relative;
  width: ${Dimensions.get('window').width}px;
  bottom: 0px;
  align-items: center;
`;

const SendIcon = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
`;
