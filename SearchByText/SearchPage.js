import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import SearchBar from './SearchBar';

const SearchPage = ({navigation}) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = searchText => {
    setSearchResults([{ id: 1, text: searchText }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} navigation={navigation} />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        //renderItem={({ item }) => (<Text>{item.text}</Text>)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchPage;