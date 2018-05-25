import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  headerLeftButton: {
    color: colors.white
  },
  headerTitleContainer: {
    flex: 3
  },
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
  },
  doneButtonContainer: {
    paddingLeft: 15
  },
  doneButton: {
    height: 60,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: colors.duskBlue
  },
  formItem: {
    height: 60,
    marginVertical: 8,
    paddingLeft: 19,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: colors.white
  }
});
