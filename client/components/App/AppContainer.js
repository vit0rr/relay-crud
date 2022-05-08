import Relay from "react-relay";
import App from "./AppComponent";
import Footer from "../Footer/FooterContainer";

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on List {
            ${Footer.getFragment("viewer")}
        }`,
  },
});
