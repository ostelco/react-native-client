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
    flex: 2
  },
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
    marginTop: 30
  },
  topButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 30,
    paddingHorizontal: 15,
    zIndex: 1
  },
  flex: {
    flex: 1
  },
  bottomButtonContainer: {
    flex: 1,
    paddingHorizontal: 45,
    paddingVertical: 20
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 8
  }
});
