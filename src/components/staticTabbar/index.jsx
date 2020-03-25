import React, { Fragment, useState } from "react";
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

export const tabHeight = 64;

const StaticTabbar = ({ tabs, value }) => {
  const values = (Animated.Values = []);

  const [state_values, set_state_values] = useState(
    tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0))
  );

  const { width } = Dimensions.get("window");
  const tabWidth = width / tabs.length;

  function onPress(index) {
    Animated.sequence([
      ...state_values.map(s_value =>
        Animated.timing(s_value, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        })
      ),
      Animated.parallel([
        Animated.spring(state_values[index], {
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.spring(value, {
          toValue: -width + tabWidth * index,
          duration: 50,
          useNativeDriver: true
        })
      ])
    ]).start();
  }

  return (
    <View style={styles.container}>
      {tabs.map(({ name }, key) => {
        const active_value = state_values[key];
        const opacity = value.interpolate({
          inputRange: [
            -width + tabWidth * (key - 1),
            -width + tabWidth * key,
            -width + tabWidth * (key + 1)
          ],
          outputRange: [1, 0, 1],
          extrapolate: "clamp"
        });

        const translateY = active_value.interpolate({
          inputRange: [0, 1],
          outputRange: [tabHeight, 0]
        });

        return (
          <Fragment {...{ key }}>
            <TouchableNativeFeedback onPress={() => onPress(key)}>
              <Animated.View style={[styles.tab, { opacity }]}>
                <Icon size={25} {...{ name }} />
              </Animated.View>
            </TouchableNativeFeedback>
            <Animated.View
              style={{
                position: "absolute",
                top: -20,
                width: tabWidth,
                left: tabWidth * key,
                height: tabHeight,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ translateY }]
              }}
            >
              <View style={styles.circle}>
                <Icon size={25} {...{ name }} />
              </View>
            </Animated.View>
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  tab: {
    height: tabHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StaticTabbar;
