import React from "react";
//const { Children } = require("react");
const { View, Text, StyleSheet } = require("react-native");

const Title = ({children}) => {
  return (
  <View>

<Text style={styles}>{children}</Text>

  </View>
  );
};
const styles = StyleSheet.create({
    fontSize: 60,
});

export default Title;