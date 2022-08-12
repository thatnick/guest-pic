import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllImages } from "../../firebase/db";
import { imageByUri } from "../../firebase/storage";
import { CurrentRenderContext } from "@react-navigation/native";

const PhotoGallery = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllImages().then((images) => {
      const promises = [];

      images.forEach((image) => {
        promises.push(imageByUri(image));
      });
      Promise.all(promises).then((data) => setLocations(data));
    });

  }, []);
  return (
  <View >
    <FlatList data={locations} renderItem={({item}) => {
      return  <Image source={{ uri: item }} style={{width: 100, height: 100 }}/>
    }}/>
  </View>);
};
export default PhotoGallery;

const styles = StyleSheet.create({});

// setTodos ((currTodos) => f
// cost nerTodos = [...currTodosl;
// newTodostpush(f
// id: currTodos. length + 1,
// text: 'code is love, code is life'
//
// return newTodos;
//
