import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const AdminCard = ({item}) => {
  const player = {uid: item.id, ...item.data()};
  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Title>{player?.nickName}</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={() => {}}>
          Cancel
        </Button>
        <Button mode="outlined" onPress={() => {}}>
          Ok
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default AdminCard;
