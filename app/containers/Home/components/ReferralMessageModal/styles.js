import {colors} from "../../../../config/colors";
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  modal: {
    margin: 0
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    zIndex: 1
  },
  content: {
    backgroundColor: colors.white,
    padding: 30
  },
  separator: {
    height: 10
  },
  description: {
    padding: 50
  },
  button: {
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    justifyContent: 'center'
  }
});