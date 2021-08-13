import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUsers } from '../../redux/modules/user';

class UsersSection extends Component {
  componentDidMount() {
    const { fetchUsers: _fetchUsers } = this.props;
    _fetchUsers();
  }

  renderUsers() {
    const { users } = this.props;
    return _.map(users, (user) => (
      <li key={user.id}>
        {user.name}
        {': '}
        {user.email}
      </li>
    ));
  }

  render() {
    return (
      <div>
        {" Here's a big list of users: "}
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    ...user,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UsersSection);
