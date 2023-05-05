import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

const CARET_COLOR = "#000";
const BLINKING_SPEED = 500; // Blinking speed in ms

const FakeCaret = React.forwardRef(
  ({ style, position, containerStyle, ...props }) => {
    const [caretVisible, setCaretVisible] = React.useState(true);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCaretVisible((value) => !value);
      }, BLINKING_SPEED);

      return () => clearInterval(interval);
    }, []);

    const styles = StyleSheet.create({
      container: {
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
      },

      input: {
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: 15,
        lineHeight: 20,
        color: "#333",
        backgroundColor: "transparent",
        zIndex: 1,
        opacity: 0,
      },

      caret: {
        position: "absolute",
        top: Platform.select({ ios: 3.5, android: 4.5 }),
        left: position - 0.5,
        width: 1,
        height: 20,
        backgroundColor: CARET_COLOR,
        zIndex: 2,
        opacity: caretVisible ? 1 : 0,
        animationKeyframes: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      },

      "@keyframes blink": {
        "0%": {
          opacity: 1,
        },

        "50%": {
          opacity: 0,
        },

        "100%": {
          opacity: 1,
        },
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          style={[styles.input, style, { zIndex: 1 }]}
          caretHidden={false}
          multiline={true}
          scrollEnabled={false}
          {...props}
        >
          {/* Add a character "|" at the specified caret position */}
          {props.value.slice(0, position)}|
        </TextInput>

        <View style={styles.caret} />
      </View>
    );
  }
);

export default FakeCaret;
