

import React from 'react';
import { Button, List, ListItem } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';
const data = new Array(30).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

 const HomeScreen = () => {

  const renderItemAccessory = (props) => (
    <Button size='tiny'>FOLLOW</Button>
  );

  const renderItemIcon = (props) => (
    <Ionicons name="person" size={24} color="black" />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (

      <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />


  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default HomeScreen;