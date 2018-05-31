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
  headerLeftButton: {
    color: colors.brownishGrey
  },
  headerTitleContainer: {
    flex: 4
  },
  consentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    padding: 35,
  },
  separator: {
    height: 15
  },
  linkButtonContainer: {
    paddingTop: 45
  },
  linkButton: {
    marginVertical: 8
  }
});
