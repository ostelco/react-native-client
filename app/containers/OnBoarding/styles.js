import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  containerImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  headerContent: {
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-between'
  },
  textContainer: {
    width: 210,
    height: 72
  },
  footerContainer: {
    flex: -1,
    width: '100%'
  },
  signInButton: {
    height: 61,
    borderRadius: 4,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    position: 'relative'
  },
  signInButtonIcon: {
    color: colors.warmGrey,
    position: 'absolute',
    left: 0,
    fontSize: 35
  },
  signInButtonText: {
    color: colors.warmGrey
  }
});
