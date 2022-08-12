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
      console.log("<<<<<<<<<<<<<<<<<<<<<n HEELLLLL");
      Promise.all(promises).then((data) => console.log(data));
    }, []);

    console.log(locations);
  });
  return <View></View>;
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
