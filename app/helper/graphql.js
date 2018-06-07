import gql from "graphql-tag";

export const getOnBoarding = gql`
  query {
    OnBoarding(
      id: "cji4g67oj2ai70126wwllnhcf"
    ) {
      translations {
        title,
        description,
        signInButton,
        termsAndConditionsLabel
        language
      }
    }
  }
`;