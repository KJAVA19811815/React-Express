import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">LOGIN WITH GOOGLE</a></li>
        )
      default:
        return <li><a href="/api/logout">LOGOUT</a></li>;
    }
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/surveys' : '/'} 
              className="nav-wrapper">
            EMAILY
            </Link>
            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{auth: state.auth};
}

export default connect(mapStateToProps)(Header);
