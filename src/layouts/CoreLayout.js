import React from 'react';

export default class CoreLayout extends React.Component {
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
}
