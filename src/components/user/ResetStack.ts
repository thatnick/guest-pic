import { CommonActions } from "@react-navigation/native";

export const resetStack = (navigation, name, params?) => {
  navigation.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name, params }] })
  );
};
