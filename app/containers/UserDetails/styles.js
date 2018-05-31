import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
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
  container: {
    backgroundColor: colors.whiteTwo
  },
  editButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  editButtonContainer: {
    width: 80,
    height: 35,
    borderRadius: 5,
    backgroundColor: colors.white,
    alignSelf: 'flex-start'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    padding: 35
  }
});
