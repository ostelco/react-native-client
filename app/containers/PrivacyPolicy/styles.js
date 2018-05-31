import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    zIndex: 1
  },
  headerRightButton: {
    color: colors.brownishGrey
  },
  headerTitleContainer: {
    flex: 2
  },
  content: {
    padding: 25,
  },
});
