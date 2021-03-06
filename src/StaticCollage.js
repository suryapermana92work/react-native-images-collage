import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

class StaticCollage extends React.Component {
  renderMatrix() {
    const {
      matrix,
      direction,
      imageStyle,
      imageHeight,
      imageWidth,
      seperatorStyle,
    } = this.props;

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sectionDirection = direction === "row" ? "column" : "row";

    return matrix.map((element, m, array) => {
      const startIndex = m ? array.slice(0, m).reduce(reducer) : 0;

      const images = this.props.images
        .slice(startIndex, startIndex + element)
        .map((image, i) => {
          // Determines if the source is a URL, or local asset
          const source = !Number.isInteger(image)
            ? { uri: image }
            : Image.resolveAssetSource(image);

          return (
            <Image
              key={i}
              source={source}
              style={[{ height: imageHeight, width: imageWidth }, imageStyle]}
            />
          );
        });

      return (
        <View
          key={m}
          style={[
            {
              flex: 1,
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              alignSelf: "flex-start",
              alignContent: "space-around",
            },
            seperatorStyle,
          ]}
        >
          {images}
        </View>
      );
    });
  }

  render() {
    const { width, height, direction, containerStyle } = this.props;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "flex-center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "flex-center",
          }}
        >
          {this.renderMatrix()}
        </View>
      </View>
    );
  }
}

StaticCollage.defaultProps = {
  // VARIABLES
  direction: "column",
  // STYLE OF SEPERATORS ON THE COLLAGE
  seperatorStyle: {
    borderWidth: 0,
    borderColor: "white",
  },

  // STYLE
  containerStyle: {
    // borderWidth: 4,
    // borderColor: 'black',
    // backgroundColor: 'green'
  },
  imageStyle: {}, // DEFAULT IMAGE STYLE
};

StaticCollage.propTypes = {
  images: PropTypes.array,
  matrix: PropTypes.array,
  direction: PropTypes.oneOf(["row", "column"]),
};

export { StaticCollage };
