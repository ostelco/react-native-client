import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 0
  },
  headerLeftButton: {
    color: colors.brownishGrey
  },
  headerTitleContainer: {
    flex: 4
  },
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
    marginTop: 30
  },
});
