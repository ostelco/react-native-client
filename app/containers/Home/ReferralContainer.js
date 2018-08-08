import {branch, compose, lifecycle, renderNothing, withState} from 'recompose';
import {withReferralIdFromState} from "../../helper/enhancers";
import Referral from "./Referral";
import {getReferralLink} from "../../helper/referral";

export default compose(
  withReferralIdFromState,
  branch(({ referralId }) => !referralId, renderNothing),
  withState('referralLink', 'setReferralLink', ''),
  lifecycle({
    async componentDidMount() {
      const { referralId, setReferralLink } = this.props;
      const referralLink = await getReferralLink(referralId)
      setReferralLink(referralLink);
    }
  }),
  branch(({ referralLink }) => referralLink === '', renderNothing),
)(Referral)
