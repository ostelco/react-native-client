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

export const getSignUp = gql`
  query {
    SignUp(id: "cji4nc7qy564301264y8swwir") {
      translations {
        title
        doneButton
        language
      }
      textInputField {
        key
        translations {
          label
          placeholder
          language
        }
      }
    }
  }
`;

export const getTermsAndConditions = gql`
  query {
    TermsAndConditions(id: "cji4qhb278rcw0141s9ol51jy") {
      translations {
        title
        subTitle
      }
      listOfTexts {
        multiLineText {
          id
          translations {
            value
          }
        }
      }
    }
  }
`;
