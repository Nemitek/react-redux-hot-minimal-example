import React        from 'react';
import { Provider } from 'react-redux';
import HomeView     from '../views/HomeView';

export default class Root extends React.Component {
  static propTypes = {
    store : React.PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <HomeView />
      </Provider>
    );
  }
}
