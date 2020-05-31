import React, { Component } from 'react';
import {
  Contact
} from 'blockstack-collections'
import { Link } from 'react-router-dom'

export default class ListContacts extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
      contacts: [],
      loaded: false
  	};
  }

  componentDidMount() {
    Contact.list((identifier) => {
      let newContacts = this.state.contacts
      newContacts.push(identifier)
      this.setState({
        contacts: newContacts,
        loaded: true
      })
      return true
    })
  }

  render() {
    return (
      <div className="panel-landing" id="section-1">
        <h1 className="landing-heading">KeyWatch</h1>
        <div className="panel">
          <div className="contact-list">
            {this.state.contacts.length === 0 && this.state.loaded && <p>Nothing here yet</p>}
            {this.state.contacts.map((contact, index) => {
              return (
                <p key={index}>        
                  <Link
                    className="btn-contact"
                    to={"/edit?id=" + contact}>
                    {contact}
                  </Link>
                </p>
              )
            })}
            <Link
              className="btn btn-primary btn-lg"
              to="/new"
            >
              Add New Credentials
            </Link>
            <br/><br/><button className="btn btn-sm btn-primary topright" onClick={this.props.handleSignOut}>Log out</button>
            <p>Hint: Click on credentials to view/edit/delete them</p>
          </div>
        </div>
      </div>
    );
  }
}
