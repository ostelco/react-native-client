import React from "react";
import Payment from "./Payment";
import {buyProduct, cardAdd, cardRemove, cardSetDefault, loadPurchaseHistory} from "../../actions";
import { connect } from 'react-redux';
import * as _ from "lodash";
import {logECommercePurchaseEvent} from "../../helper/analytics";
import {callApi} from "../../middleware/api";
import Config from 'react-native-config'


class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      form: {},
      isLoading: false,
      saveCard: true,
      addNewCard: false,
      isConfirmDialogVisible: false,
      selectedCard: null,
      showFullScreenLoading: false
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

  _cardFormSubmit = (source = false) => {

    if (source) {
      this.setState({ isLoading: true });

      const cards = this.props.cards.filter(data => data.isDefault);
      if (cards.length === 0) {
        alert('Try again later.')
      } else {
        const source = cards[0].id;
        // console.log('Buying sku', this.props.selectedProduct.sku);
        this.props.buyProduct(this.props.selectedProduct.sku, source)
          .then(() => {
            // console.log('Payment success');
            this.setState({ isDialogVisible: true });
            this.props.loadPurchaseHistory()
          })
          .catch(error => {
            console.log('error payment failed', error);
            alert('Error: ' + JSON.stringify(error));
          })
          .finally(() => {
            this.setState({ isLoading: false });
            // console.log('Buying sku', this.props.selectedProduct.sku);
          })
        // TODO: Use purchase API for default card
      }
    } else {
      const { form } = this.state;
      if (form.valid) {
        const { number, cvc, expiry } = form.values;
        const [exp_month, exp_year] = expiry.split('/');
        console.log(form);

        this.setState({ isLoading: true });
        fetch(`https://api.stripe.com/v1/sources?card[number]=${number}&card[cvc]=${cvc}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&type=card`, {
          method: "post",
          headers: {
            'Authorization': `Bearer ${Config.STRIPE_PUBLISHABLE_KEY}`
          }
        })
          .then(data => data.json())
          .then(data => {
            // TODO: Use purchase API with new card and setDefault true
            // console.log('stripeSource', data);
            if (data.error) {
              throw data.error.message
            }
            return callApi('paymentSources', 'POST', null, null, [
              'sourceId=' + data.id
            ])
              .then(result => {
                return callApi('paymentSources', 'PUT', null, null, [
                  'sourceId=' + data.id
                ])
              })
              .then(result => {
                // console.log('**********************');
                // console.log('paymentSourceSuccess', result);
                return this.props.buyProduct(this.props.selectedProduct.sku, data.id)
              })
              .then(() => {
                this.setState({ isDialogVisible: true });
                this.props.loadPurchaseHistory();
              })
              .catch(err => {
                // console.log('----------------------');
                console.log('paymentSourceFailure', err);
                throw err
              });
            /*
            if (this.state.saveCard) {
              this.props.cardAdd({...data.card });
              this.props.cardSetDefault(data.card.id)
            }
            */
          })
          .catch(error => {
            console.log(error);
            alert('Error: ' + JSON.stringify(error))
          })
          .finally(() => {
            this.setState({ isLoading: false });
            // console.log('Buying sku', this.props.selectedProduct.sku);
          })
      }
    }
  };

  removeCard(id) {
    this.setState({ showFullScreenLoading: true });
    callApi('paymentSources', 'DELETE', null, null, [`sourceId=${id}`])
      .then(() => {
        this.props.cardRemove(id);
      })
      .catch(() => {
        alert('Something bad happened. Try again later')
      })
      .finally(() => {
        this.setState({ showFullScreenLoading: false });
      })
  }

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
        cardRemove={(id) => this.removeCard(id)}
        isConfirmDialogVisible={this.state.isConfirmDialogVisible}
        setIsConfirmDialogVisible={value => this.setState({ isConfirmDialogVisible: value })}
        setSelectedCard={card => this.setState({ selectedCard: card })}
        selectedCard={this.state.selectedCard}
        showFullScreenLoading={this.state.showFullScreenLoading}
        featureFlagEnableAddNewCreditCard={this.props.remoteConfig.featureFlagEnableAddNewCreditCard}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, selectedProduct, cards, remoteConfig } = state;
  return {
    error,
    selectedProduct,
    cards,
    remoteConfig,
  };
};

export default connect(mapStateToProps, {
  buyProduct,
  cardAdd,
  cardRemove,
  cardSetDefault,
  loadPurchaseHistory,
})(PaymentContainer);


