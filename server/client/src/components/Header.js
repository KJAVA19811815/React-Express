import React, {Component} from 'react';

class Header extends Component {
  render(){
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="nav-wrapper">
            EMAILY
            </a>
            <ul id="nav-mobile" className="right">
              <a href="/auth/google">LOGIN WITH GOOGLE</a>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;
