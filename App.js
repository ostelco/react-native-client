import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator } from "react-navigation";
import {
  Body,
  Button,
  Text,
  Container,
  Content,
  Footer,
  Form,
  Header,
  Input,
  Item,
  Root,
  FooterTab,
  Title,
  Right, Left, List, ListItem, Grid, Row, Col, Icon, Card, CardItem, H1, Label, Switch, Radio
} from "native-base";
import ReadMore from "react-native-read-more-text";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { OnBoardingContainer, SignupContainer, TermsAndConditionsContainer, GDPRContainer, HomeContainer, PaymentContainer } from "./app/containers";
import { RNConfetti } from "./app/components";

class SettingsScreen extends React.Component {

  _showUserDetails = () => {
    this.props.navigation.navigate('UserDetails');
  };

  _showPrivacy = () => {
    this.props.navigation.navigate('Privacy');
  };

  _showPurchaseHistory = () => {
    this.props.navigation.navigate('PurchaseHistory');
  };

  _showDeleteAccount = () => {
    this.props.navigation.navigate('DeleteAccount');
  };

  _showOnBoarding = () => {
    this.props.navigation.navigate('OnBoarding');
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>Menu</Title>
          </Body>
        </Header>
        <Content padder>
          <Grid>
            <Row>
              <Col>
                <Card style={{ padding: 20 }}>
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }} button onPress={this._showUserDetails}>
                    {/* <Icon name="ios-person" style={{ textAlign: 'center' }} /> */}
                    <Text>Personal details</Text>
                  </CardItem>
                </Card>
              </Col>
              <Col>
                <Card style={{ padding: 20 }}>
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }} button onPress={this._showPrivacy}>
                    {/* <Icon name="key" style={{ textAlign: 'center' }} /> */}
                    <Text>Privacy</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={this._showPurchaseHistory}>
                    <Text>What you bought</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={this._showDeleteAccount}>
                    <Text>Delete account</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={this._showOnBoarding}>
                    <Text>Logout</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

class UserDetailsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
            <Title>Personal Details</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={'Kerstin Kaspersen'} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={'kerstin@mail.com'} />
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input value={'Kongsvejen 72\n1177 Oslo\nNorway\n'} multiline={true} />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

class PrivacyScreen extends React.Component {

  _showPrivacyPolicy = () => {
    this.props.navigation.navigate('PrivacyPolicy');
  };

  _showTermsAndConditions = () => {
    this.props.navigation.navigate('TermsAndConditions')
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>Privacy</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem noBorder>
              <Body>
                <Text>
                  In order to give you offers that fit your needs, you need to agree to let us:
                </Text>
              </Body>
            </ListItem>
            <ListItem noBorder>
              <Body>
                <Text>Analyze your data usage to be able to give you personalized offers.</Text>
              </Body>
              <Right>
                <Switch value={true} />
              </Right>
            </ListItem>
            <ListItem noBorder button onPress={this._showPrivacyPolicy}>
              <Body>
                <Text style={{ textDecorationLine: 'underline' }}>Privacy policy</Text>
              </Body>
            </ListItem>
            <ListItem noBorder button onPress={this._showTermsAndConditions}>
              <Body>
                <Text style={{ textDecorationLine: 'underline' }}>Terms & Conditions</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

class PurchaseHistoryScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>What you bought</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem>
              <Body>
                <Text>2018-04-12</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2018-03-25</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2018-03-01</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

class DeleteAccountScreen extends React.Component {

  _showLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>Delete account</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem noBorder>
              <Text>
                Deleting your account will delete all remaining data.
              </Text>
            </ListItem>
            <ListItem noBorder>
              <Text style={{ fontWeight: 'bold' }}>
                Why do you want to delete your account?
              </Text>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Got a better deal elsewhere</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>I need a deal to buy a phone</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Too many bugs!</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Rather not say</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Button block onPress={this._showLogin}>
                  <Text>Delete my account completely</Text>
                </Button>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Button block onPress={() => this.props.navigation.goBack()}>
                  <Text>Mistake! Sorry didn't mean it take me back</Text>
                </Button>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

class PrivacyPolicyScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>Privacy policy</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem header noBorder>
              <Text>Headline</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>We collect information in the following ways</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information you give us. For example, many of our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number or credit card to store with you account. If you want to take full advantage of the sharing feature we offer, we might also ask you to create a publicly visible profile, which may include your name and photo.
              </Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you watch a video, visit a website that uses our advertising services, or view and interact with our ads and content.
              </Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

class TermsAndConditionsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              {/* <Icon name="arrow-back" /> */}
            </Button>
          </Left>
          <Body>
          <Title>Terms & Conditions</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem header noBorder>
              <Text>Headline</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>We collect information in the following ways</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information you give us. For example, many of our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number or credit card to store with you account. If you want to take full advantage of the sharing feature we offer, we might also ask you to create a publicly visible profile, which may include your name and photo.
              </Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you watch a video, visit a website that uses our advertising services, or view and interact with our ads and content.
              </Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}


const AppStack = createStackNavigator({
  Home: {
    screen: HomeContainer
  },
  Payment: {
    screen: createSwitchNavigator({
      PaymentForm: PaymentContainer,
      PaymentComplete: RNConfetti
    }, {
      initialRouteName: 'PaymentForm',
      headerMode: 'none'
    })
  },
  Menu: {
    screen: createStackNavigator({
      Settings: {
        screen: SettingsScreen
      },
      UserDetails: {
        screen: UserDetailsScreen
      },
      Privacy: {
        screen: createStackNavigator({
          Home: {
            screen: PrivacyScreen
          },
          PrivacyPolicy: {
            screen: PrivacyPolicyScreen
          },
          TermsAndConditions: {
            screen: TermsAndConditionsScreen
          }
        }, {
          initialRouteName: 'Home',
          headerMode: 'none'
        })
      },
      PurchaseHistory: {
        screen: PurchaseHistoryScreen
      },
      DeleteAccount: {
        screen: DeleteAccountScreen,
      }
    }, {
      initialRouteName: 'Settings',
      headerMode: 'none'
    })
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});

const RootStack = createSwitchNavigator({
  // OnBoarding: OnBoardingScreen,
  OnBoarding: createStackNavigator({
    Home: {
      screen: OnBoardingContainer
    },
    TermsAndConditions: {
      screen: TermsAndConditionsContainer
    },
    Signup: {
      screen: SignupContainer
    }
  }, {
    initialRouteName: 'Home',
    headerMode: 'none'
  }),
  GDPR: GDPRContainer,
  App: {
    screen: AppStack
  }
}, {
  initialRouteName: 'OnBoarding'
});


const AppLoading = () => (
  <Text>Loading...</Text>
);


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    /*
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    */
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <RootStack />
      </Root>
    );
  }
}

// export default /*__DEV__*/ true ? StorybookUI : App;
