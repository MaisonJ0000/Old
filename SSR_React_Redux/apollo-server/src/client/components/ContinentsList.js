import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContinents } from "../actions";

class ContinentsList extends Component {
  componentDidMount() {
    this.props.fetchContinents();
  }

  renderContinents() {
    return this.props.continents.map(continent => {
      return <li key={ continent.code }>{ continent.name }</li>
    });
  }

  render() {
    return (
      <div>
        Here's a big list of continents:
        <ul>{ this.renderContinents() }</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { continents: state.continents };
}

const loadData = (store) => {
  return store.dispatch(fetchContinents());
};

export { loadData };
export default connect(mapStateToProps, { fetchContinents })(ContinentsList);