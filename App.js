import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Animated,
  StatusBar,
} from "react-native";
import { Video } from "expo-av";
const { width, height } = Dimensions.get("window");
const screenRatio = height / width;

export default function App() {
  // THE CONTENT
  const [content, setContent] = useState([
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_887082.jpeg?alt=media&token=f3108b84-d792-4f40-b925-7f856e1c3fd4",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_120601.jpeg?alt=media&token=16ddbe0e-d5cc-421e-b051-56655e5b23c6",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_205913.jpeg?alt=media&token=93847935-1e7b-419d-9765-c14943db7110",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_303042.jpeg?alt=media&token=2a4d5740-d62b-4d9c-9693-af57c50e169b",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_532559.jpeg?alt=media&token=aa5c2524-6831-4191-900d-603dd02dbe10",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_605599.jpeg?alt=media&token=aea9bd4e-809e-4427-8f6c-caa7a04cba7a",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_610110.jpeg?alt=media&token=153af30a-9642-4316-8959-2b60cac42ff5",
      type: "image",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/WhatsApp%20Video%202022-04-26%20at%203.13.39%20AM.mp4?alt=media&token=d8a576a8-c0c0-489c-9181-b201d2fb709f",
      type: "video",
      finish: 0,
    },
    {
      content:
        "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/AnimeX_614743.jpeg?alt=media&token=090dfdbb-678f-415f-8878-6d7f9690fb2d",
      type: "image",
      finish: 0,
    },
  ]);

  // for get the duration
  const [end, setEnd] = useState(0);
  // current is for get the current content is now playing
  const [current, setCurrent] = useState(0);
  // if load true then start the animation of the bars at the top
  const [load, setLoad] = useState(false);
  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;

  // start() is for starting the animation bars at the top
  function start(n) {
    // checking if the content type is video or not
    if (content[current].type == "video") {
      // type video
      if (load) {
        Animated.timing(progress, {
          toValue: 1,
          duration: n,
        }).start(({ finished }) => {
          if (finished) {
            next();
          }
        });
      }
    } else {
      // type image
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
      }).start(({ finished }) => {
        if (finished) {
          next();
        }
      });
    }
  }

  // handle playing the animation
  function play() {
    start(end);
  }

  // next() is for changing the content of the current content to +1
  function next() {
    // check if the next content is not empty
    if (current !== content.length - 1) {
      let data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the next content is empty
      close();
    }
  }

  // previous() is for changing the content of the current content to -1
  function previous() {
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      let data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the previous content is empty
      close();
    }
  }

  return (
    <View style={styles.containerModal}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.backgroundContainer}>
        {/* check the content type is video or an image */}
        {content[current].type == "video" ? (
          <Video
            source={{
              uri: content[current].content,
            }}
            rate={1.0}
            volume={1.0}
            resizeMode="cover"
            shouldPlay={true}
            positionMillis={0}
            onReadyForDisplay={play()}
            onPlaybackStatusUpdate={(AVPlaybackStatus) => {
              console.log(AVPlaybackStatus);
              setLoad(AVPlaybackStatus.isLoaded);
              setEnd(AVPlaybackStatus.durationMillis);
            }}
            style={{ height: height, width: width }}
          />
        ) : (
          <Image
            onLoadEnd={() => {
              progress.setValue(0);
              play();
            }}
            source={{
              uri: content[current].content,
            }}
            style={{ width: width, height: height, resizeMode: "cover" }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* ANIMATION BARS */}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          {content.map((index, key) => {
            return (
              // THE BACKGROUND
              <View
                key={key}
                style={{
                  height: 2,
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(117, 117, 117, 0.5)",
                  marginHorizontal: 2,
                }}
              >
                {/* THE ANIMATION OF THE BAR*/}
                <Animated.View
                  style={{
                    flex: current == key ? progress : content[key].finish,
                    height: 2,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  }}
                />
              </View>
            );
          })}
        </View>
        {/* END OF ANIMATION BARS */}

        <View
          style={{
            height: 50,
            flexDirection: "row",

            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          {/* THE AVATAR AND USERNAME  */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 30, width: 30, borderRadius: 25 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/insta-status-clone.appspot.com/o/IMG_20210912_074748.jpg?alt=media&token=c2ff4f6f-c78e-40fb-9740-75bdcb0327b1",
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                paddingLeft: 10,
              }}
            >
              Anil
            </Text>
          </View>
          {/* END OF THE AVATAR AND USERNAME */}
        </View>
        {/* HERE IS THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => previous()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => next()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        {/* END OF THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundContainer: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
