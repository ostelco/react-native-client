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
  content: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    paddingRight: 30,
    backgroundColor: colors.whiteTwo,
    marginTop: 30
  },
  list: {
    flex: 1
  },
  icon: {
    textAlign: 'center'
  },
  footer: {
    flex: -1,
    width: '100%'
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.white
  },
  acceptButton: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa
  },
  privacyTextContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});
