import React from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Animated
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";

import StaticTabbar, { tabHeight as height } from "../staticTabbar";

const tabs = [
  { name: "grid" },
  { name: "list" },
  { name: "refresh-cw" },
  { name: "box" },
  { name: "user" }
];

let { width } = Dimensions.get("window");
width = Math.ceil(width);
const tabWidth = Math.ceil(width / tabs.length);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// .curve(shape.curveBasis)
const left = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  { x: 0, y: 0 },
  { x: width, y: 0 }
]);

const tab = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  { x: width, y: 0 },
  { x: width + 2, y: 2 },
  { x: width + 3, y: 15 },
  { x: width + 14, y: height - 14 },
  { x: width + tabWidth - 14, y: height - 13 },
  { x: width + tabWidth - 2, y: -2 },
  { x: width + tabWidth - 1, y: -1 },
  { x: width + tabWidth - 1, y: -1 }
]);

const right = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  { x: width + tabWidth, y: 0 },
  { x: width * 2.5, y: 0 },
  { x: width * 2.5, y: height },
  { x: 0, y: height },
  { x: 0, y: 0 }
]);

const d = `${left} ${tab} ${right}`;

const Tabbar = () => {
  const translateX = new Animated.Value(-width);

  return (
    <>
      <View {...{ width, height }}>
        <AnimatedSvg
          width={width * 2.5}
          height={height}
          style={{ transform: [{ translateX }] }}
        >
          <Path d={d} fill="white" />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar value={translateX} {...{ tabs }} />
        </View>
      </View>
      <SafeAreaView style={styles.safeArea} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white"
  }
});

export default Tabbar;
