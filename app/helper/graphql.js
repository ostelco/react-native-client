import gql from "graphql-tag";

export const getOnBoarding = gql`
  query {
    OnBoarding(
      id: "cji4g67oj2ai70126wwllnhcf"
    ) {
      id
      translations {
        id
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
        id
        title
        doneButton
        language
      }
      textInputField {
        id
        key
        translations {
          id
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
        id
        title
        subTitle
      }
      listOfTexts {
        id
        multiLineText {
          id
          translations {
            id
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
        id
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
          id
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
      sku
      translations {
        id
        productLabel
      }
    }
    allOfferProducts {
      id
      priceLabel
      sku
      translations {
        id
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
      sku
      priceLabel
      translations {
        id
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
        id
        offerLabel
        productLabel
        description
      }
    }
  }
`;

export const getProduct = gql`
  query ($sku: String!) {
    OfferProduct(sku: $sku) {
      id
      sku
      priceLabel
      translations {
        id
        productLabel
      }
    }
    DefaultProduct(sku: $sku) {
      id
      sku
      priceLabel
      translations {
        id
        productLabel
      }
    }
  }
`;
