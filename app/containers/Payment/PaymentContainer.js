import React from "react";
import Payment from "./Payment";
import {buyProduct, cardAdd, cardRemove, cardSetDefault} from "../../actions";
import { connect } from 'react-redux';
import * as _ from "lodash";
import {logECommercePurchaseEvent} from "../../helper/analytics";

class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      form: {},
      isLoading: false,
      saveCard: true,
      addNewCard: false,
    }
  }

  _goBack = () => {
    this.setState({ isDialogVisible: false });
    logECommercePurchaseEvent(this.props.selectedProduct);
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    this.setState({ isDialogVisible: true });

    console.log('Buying sku', this.props.selectedProduct.sku)
    this.props.buyProduct(this.props.selectedProduct.sku)
  };

  _cardFormOnChange = (form) => {
    this.setState({ form });
  };

  _cardFormSubmit = (useExisting = false) => {

    if (useExisting) {
      this.setState({ isLoading: true });

      // TODO: Use purchase API for default card

      this.setState({ isLoading: false, isDialogVisible: true });
      console.log('Buying sku', this.props.selectedProduct.sku);
      this.props.buyProduct(this.props.selectedProduct.sku);
    } else {
      const { form } = this.state;
      if (form.valid) {
        const { number, cvc, expiry } = form.values;
        const [exp_month, exp_year] = expiry.split('/');
        console.log(form);

        this.setState({ isLoading: true });
        fetch(`https://api.stripe.com/v1/tokens?card[number]=${number}&card[cvc]=${cvc}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}`, {
          method: "post",
          headers: {
            'Authorization': 'Bearer sk_test_Oqbg97kpc6seWj2GEev6x2qa'
          }
        })
          .then(data => data.json())
          .then(data => {
            // TODO: Use purchase API with new card and setDefault true
            if (this.state.saveCard) {
              this.props.cardAdd({...data.card });
              this.props.cardSetDefault(data.card.id)
            }
          })
          .catch(error => {
            // alert('Error: ' + error)
          })
          .finally(() => {
            this.setState({ isLoading: false, isDialogVisible: true });
            console.log('Buying sku', this.props.selectedProduct.sku);
            this.props.buyProduct(this.props.selectedProduct.sku);
          })
      }
    }
  };

  render() {
    const productLabel = _.get(this.props.selectedProduct, "presentation.productLabel", "");
    const priceLabel = _.get(this.props.selectedProduct, "presentation.priceLabel", "");
    return (
      <Payment
        goBack={this._goBack}
        isDialogVisible={this.state.isDialogVisible}
        priceLabel={priceLabel}
        productLabel={productLabel}
        onChange={this._cardFormOnChange}
        onSubmit={this._cardFormSubmit}
        isValid={this.state.form.valid}
        isLoading={this.state.isLoading}
        saveCard={this.state.saveCard}
        setSaveCard={value => this.setState({ saveCard: value })}
        cards={this.props.cards}
        showCardList={this.props.cards.length > 0}
        addNewCard={this.state.addNewCard}
        showAddNewCard={() => this.setState({ addNewCard: true })}
        cardSetDefault={this.props.cardSetDefault}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, selectedProduct, cards } = state;
  return {
    error,
    selectedProduct,
    cards
  };
};

export default connect(mapStateToProps, {
  buyProduct,
  cardAdd,
  cardRemove,
  cardSetDefault
})(PaymentContainer);


