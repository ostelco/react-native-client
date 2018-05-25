import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo
  },
  header: {
    backgroundColor: colors.rosa,
    borderBottomWidth: 0,
    justifyContent: 'space-evenly'
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
    backgroundColor: colors.rosa
  },
  staticOfferContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  staticOfferButtonContainer: {
    width: 220,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  offerButton: {
    textAlign: 'center'
  },
  specialOfferContainer: {
    padding: 30
  },
  specialOffer: {
    width: '100%',
    height: 225,
    borderRadius: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  specialOfferButtonContainer: {
    width: 220,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  specialOfferButtonTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  emptyOfferIcon: {
    color: colors.rosa
  }
});
