import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo,
  },
  headerButton: {
    color: colors.brownishGrey
  },
  headerTitleContainer: {
    alignItems: "center"
  },
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
  }
});
