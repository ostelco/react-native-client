import gql from "graphql-tag";

export const getOnBoarding = gql`
  query {
    OnBoarding(
      id: "cji4g67oj2ai70126wwllnhcf"
    ) {
      id
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
      id
      translations {
        title
        doneButton
        language
      }
      textInputField {
        id
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
      id
      translations {
        title
        subTitle
      }
      listOfTexts {
        id
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

export const getGDPR = gql`
  query {
    GDPR(id: "cji4rtv2s97bp0141rzp4onr2") {
      id
      translations {
        title
        description
        denyButtonText
        privacyText
        confirmButtonText
      }
      gDPRFields {
        icon
        id
        translations {
          description
          language
        }
      }
    }
  }
`;

export const getAllProducts = gql`
  query {
    allDefaultProducts {
      id
      priceLabel
      translations {
        productLabel
      }
    }
    allOfferProducts {
      id
      priceLabel
      translations {
        offerLabel
        productLabel
      }
    }
  }
`;

export const getDefaultProductBySKU = gql`
  query DefaultProduct($sku: String!) {
    DefaultProduct(sku: $sku) {
      id
      priceLabel
      translations {
        productLabel
      }
    }
  }
`;

export const getOfferProductBySKU = gql`
  query OfferProduct($sku: String!) {
    OfferProduct(sku: $sku) {
      id
      priceLabel
      sku
      translations {
        offerLabel
        productLabel
        description
      }
    }
  }
`;

export const getProduct = gql`
  query ($id: ID!) {
    OfferProduct(id: $id) {
      id
      priceLabel
      translations {
        productLabel
      }
    }
    DefaultProduct(id: $id) {
      id
      priceLabel
      translations {
        productLabel
      }
    }
  }
`
