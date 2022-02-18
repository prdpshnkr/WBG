import React, { Component } from "react";

const BirdContext = React.createContext();

export class BirdProvider extends Component {
  state = {
    bird: "",
  };

  setBird = (bird) => {
    this.setState({ bird: 'Cccrrooww' });
  };

  render() {
      const {bird} = this.state;
      const {setBird} = this;
    return (
        <BirdContext.Provider value={{
            bird, setBird
        }}>
            {this.props.children}
        </BirdContext.Provider>
    );
  }
}

export default BirdContext;
