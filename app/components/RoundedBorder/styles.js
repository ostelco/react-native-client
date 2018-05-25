import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";
import {deviceWidth} from "../../config/variables";

export default StyleSheet.create({
  container: {
    height: 35,
    position: 'relative',
    overflow: 'hidden',
    width: '100%'
  },
  content: {
    // Make perfect circle
    width: deviceWidth,
    borderBottomRightRadius: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 2,
    height: deviceWidth,
    backgroundColor: colors.white,
    transform: [
      // Create oval by scaling X to get correct angle on border
      {scaleX: 1.8},
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    marginTop: -deviceWidth + 35
  },
});
