import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    zIndex: 1,
  },
  headerTitleContainer: {
    flex: 2
  },
  container: {
    backgroundColor: colors.whiteTwo
  },
  contentContainer: {
    padding: 35
  },
  input: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  footerButton: {
    borderRadius: 0
  },
  submitButton: {
    backgroundColor: colors.lipstick
  },
  cancelButton: {
    backgroundColor: colors.white
  },
  footer: {
    borderTopWidth: 0
  }
});
