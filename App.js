import React, { useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  useWindowDimensions
} from "react-native";
import ExpensiMark from "expensify-common/lib/ExpensiMark";
import HTML from "react-native-render-html";
import FakeCaret from "./FakeCaret";

const parser = new ExpensiMark();

const MarkdownPreview = ({ htmlContent }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <ScrollView
        style={styles.markdownPreview}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        onPress={() => {
          console.log("onPress");
          textInputRef.current.focus();
        }}
      >
        <HTML
          source={{ html: htmlContent }}
          contentHeight={props.contentHeight || height * 0.8}
        />
      </ScrollView>
    </>
  );
};

export default function App() {
  const textInputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [htmlContent, setHtmlContent] = useState(
    "<p>Type some markdown here</p>"
  );
  const [caretPosition, setCaretPosition] = useState(0);

  const handleInputChange = (text) => {
    setInputText(text);
    setHtmlContent(parser.replace(text));
    console.log(text);
    console.log(parser.replace(text));
  };

  return (
    <View style={styles.container}>
      <MarkdownPreview htmlContent={htmlContent} />

      <View style={styles.inputWrapper}>
        <FakeCaret
          style={styles.fakeCaret}
          containerStyle={styles.fakeCaretContainer}
          value={inputText}
          position={caretPosition}
          onChangeText={handleInputChange}
          ref={textInputRef}
          pointerEvents="none"
        />

        <View style={styles.textInputContainer}>
          {/* Placeholder container */}
          <View
            style={[
              styles.placeholderContainer,
              {
                top: inputText ? -20 : 10,
              },
              inputText.length > 0 && styles.placeholderContainerActive,
            ]}
          >
            <Text
              style={[
                styles.placeholder,
                inputText.length > 0 && styles.placeholderActive,
              ]}
            >
              Type some markdown here
            </Text>
            <View>
              {inputText && (
                <View
                  style={[
                    styles.caret,
                    inputText.length > 0 && styles.caretActive,
                    { left: caretPosition === inputText.length ? "100%" : 0 }, // move caret when inputText changes
                  ]}
                />
              )}
            </View>
          </View>

          {/* Input text */}
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            multiline
            scrollEnabled={false}
            keyboardAppearance="default"
            value={inputText}
            onChangeText={handleInputChange}
            onSelectionChange={(event) =>
              setCaretPosition(event.nativeEvent.selection.start)
            }
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    position: "relative",
  },

  // first level
  markdownPreview: {
    minHeight: 40,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    //
  },
  inputWrapper: {
    minHeight: 40,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    //
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "visible",
  },

  // second level
  scrollViewContainer: {
    height: "inherit",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textInputContainer: {
    height: "inherit",
    backgroundColor: "#fff",
    borderColor: "#00000022",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 200,
  },
  placeholderContainer: {
    height: 40,
    flexDirection: "row",
    alignItmes: "center",
  },
  caret: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
  },
  placeholder: {
    color: "#00000044",
  },
  textInput: {
    zIndex: 1,
  },
});
