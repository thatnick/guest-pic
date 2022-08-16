import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Switch } from "react-native-gesture-handler";

const GuestCard = ({ item }) => {
  console.log(item.attending);
  const [isAttending, setIsAttending] = useState<"true" | "false">(false);

  const attendingSwitch = useCallback(() => {
    setIsAttending((position) => (position === "false" ? "true" : "false"));
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.alignLeft}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatarUrl,
          }}
        />
        <Text>{item.name}</Text>
      </View>
      <View style={styles.switch}>
        <Switch value={isAttending} onValueChange={attendingSwitch} />
      </View>
    </View>
  );
};

export default GuestCard;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  alignLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
