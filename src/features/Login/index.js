import React, { Component } from "react";
import AutoForm from "../../shared/components/AutoForm";

const FORM_DATA = {
  title: "Login",
  submitBtnName: "Submit",
  cancelBtnName: "Cancel",
  formSchema: [
    {
      name: "username",
      id: "username",
      type: "text",
      label: "User Name",
      required: true,
    },
    {
      name: "password",
      id: "password",
      type: "password",
      label: "Password",
      required: true,
    },
    {
      name: "rememberMe",
      id: "rememberMe",
      type: "checkbox",
      label: "Remember me?",
      required: true,
    },
    {
      name: "profile",
      id: "profile",
      type: "file",
      label: "Profile",
      required: true,
    },
  ],
};
export default class Login extends Component {
  handleSubmit = (data) => {
    console.log(data);
  };
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <AutoForm formData={FORM_DATA} onSubmit={this.handleSubmit} />
        </div>
        <div className="col-sm-12 col-md-6"></div>
      </div>
    );
  }
}
