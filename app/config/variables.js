import {Dimensions, Platform} from "react-native";

// Copied from native base since they don't expose the variables through the library
export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export const toolbarHeight = platform === "ios" ? (isIphoneX ? 88 : 64) : 56;