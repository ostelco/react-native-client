import { branch, renderComponent, withProps } from "recompose";

export const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component)
  );

export const getTranslation = (propName, lang = 'EN_US') =>
  withProps(({ data }) => ({ presentationData: data[propName].translations.find(x => x.language === lang)}));