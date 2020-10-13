import React from "react";
import history from "./../history";
import styled from "styled-components";

const StyleDiv = styled.div`
  width: 90%;
  length: 100%;
  max-width: 100rem;
  margin: 2rem auto;
  border: 8px solid #ccc;
  padding: 2rem;
  background: lightblue;
  font-size: 21px;
`;

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      role: "admin",
    };
  }

  handleSignIn() {
    switch (this.state.role) {
      case "admin":
        history.push("/admin");
        break;
      case "manufacturer":
        history.push("/manufacturer");
        break;
      case "distributor":
        history.push("/distributor");
        break;
      case "retailer":
        history.push("/retailer");
        break;
      case "transporter":
        history.push("/transporter");
        break;
    }
  }

  handleRoleSelection(e) {
    this.setState({
      role: e.target.value,
    });
  }

  render() {
    return (
      <StyleDiv>
        <form onSubmit={this.handleSignIn.bind(this)}>
          <h3>Login in</h3>
          <label for="cars">Choose Role:</label>
          <select
            name="cars"
            id="cars"
            onChange={this.handleRoleSelection.bind(this)}
          >
            <option value="admin">Admin</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="distributor">Distributor</option>
            <option value="retailer">Retailer</option>
            <option value="transporter">Transporter</option>
          </select>
          <input type="text" ref="username" placeholder="Username" />
          <input type="password" ref="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </StyleDiv>
    );
  }
}

export default Login;
