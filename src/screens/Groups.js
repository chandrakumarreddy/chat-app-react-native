import React from 'react';
import styled from 'styled-components/native';
import {firestore} from '../firebase/firebase';
import {FlatList} from 'react-native-gesture-handler';

import Text from '../shared/Text';
import colors from '../utils/colors';

export default function Groups({navigation}) {
  const [groups, setGroups] = React.useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button activeOpacity={1} onPress={() => {}}>
          <Image
            source={{
              uri:
                'https://img.icons8.com/ios/30/000000/logout-rounded-left.png',
            }}
          />
        </Button>
      ),
      headerRight: () => (
        <Button
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('AddGroup');
          }}>
          <Image
            source={{
              uri: 'https://img.icons8.com/pastel-glyph/64/000000/plus.png',
            }}
          />
        </Button>
      ),
    });
  }, [navigation]);
  React.useEffect(() => {
    try {
      firestore.collection('groups').onSnapshot(function(querySnapshot) {
        const tempGroups = [];
        querySnapshot.forEach(function(doc) {
          const {groupName, groupId, thumbnail} = doc.data();
          tempGroups.push({name: groupName, id: groupId, thumbnail});
        });
        setGroups(tempGroups);
      });
    } catch (error) {
      alert(error.message);
    }
  }, []);
  const renderGroup = group => (
    <Group>
      <Thumbnail>
        <GroupIcon
          source={{
            uri: group.thumbnail,
          }}
        />
      </Thumbnail>
      <GroupName small>{group.name}</GroupName>
    </Group>
  );
  return (
    <Container>
      <FlatList
        data={groups}
        renderItem={({item}) => renderGroup(item)}
        keyExtractor={item => String(item.id)}
      />
    </Container>
  );
}

const Container = styled.View``;

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

const Thumbnail = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.uaStudiosGreen};
`;

const GroupIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

const Group = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid ${colors.lighishGray};
`;

const GroupName = styled(Text)`
  padding-left: 20px;
  color: ${colors.black};
`;
