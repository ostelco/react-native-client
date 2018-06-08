import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo
  },
  header: {
    backgroundColor: colors.rosa,
    borderBottomWidth: 0,
    justifyContent: 'space-evenly',
    zIndex: 1
  },
  headerRightButton: {
    color: colors.white
  },
  headerTitleContainer: {
    flex: 4
  },
  content: {
    flex: 1
  },
  topContentContainer: {
    backgroundColor: colors.rosa,
    zIndex: 1
  },
  topContentEmptyContainer: {
    padding: 20
  },
  descriptionContainer: {
    padding: 30
  },
  emptyContainerIcon: {
    fontSize: 160,
    color: 'white',
    textAlign: 'center'
  }
});
