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
    flex: 1
  },
  productDescriptionContainer: {
    padding: 0,
    backgroundColor: colors.white,
    zIndex: 1
  },
  paymentFormContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 45,
    paddingTop: 35
  },
  row: {
    flexDirection: 'row'
  },
  firstColumn: {
    flex: 2,
    marginRight: 25
  },
  secondColumn: {
    flex: 1
  },
  firstColumnTextContainer: {
    marginBottom: 5
  },
  secondColumnTextContainer: {
    height: 60,
    backgroundColor: colors.white
  },
  leftPadding: {
    paddingLeft: 10
  },
  footer: {
    alignSelf: 'flex-end',
    paddingHorizontal: 45,
    width: '100%',
    paddingBottom: 25
  },
  submitButtonContainer: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    justifyContent: 'center'
  }
});
