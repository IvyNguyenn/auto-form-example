import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  CustomInput,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

let validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export default class AutoForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputData: {},
      validationSchema: {},
    };
  }

  componentDidMount() {
    const { formData } = this.props;
    this.initFormSchema(formData.formSchema);
    this.initValidationSchema(formData.formSchema);
  }

  initFormSchema = (formSchema) => {
    let _inputData = {};
    formSchema.forEach((field) => {
      _inputData[field.name] = "";
    });
    this.setState({ inputData: _inputData });
  };

  initValidationSchema = (formSchema) => {
    let _validationSchema = {};
    formSchema.forEach((field) => {
      const { name, required } = field;
      switch (field.type) {
        case "text":
          _validationSchema[name] = Yup.string();
          break;
        case "email":
          _validationSchema[name] = Yup.string().email();
          break;
        case "password":
          _validationSchema[name] = Yup.string().email();
          break;
      }
      if (_validationSchema[name] && required) {
        _validationSchema[name] = _validationSchema[name].required();
      }
    });
    this.setState({
      validationSchema: Yup.object().shape({ ..._validationSchema }),
    });
  };

  render() {
    const { formData, onSubmit } = this.props;
    const { inputData, validationSchema } = this.state;
    return (
      <Formik
        enableReinitialize
        initialValues={inputData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { touched, errors } = props;
          const isError = (field) => touched[field] && !!errors[field];
          return (
            <Form>
              <p className="h1">Login</p>
              {formData.formSchema.map((field, index) => (
                <FormGroup key={index}>
                  <Field
                    as={InputComponent}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    id={field.id}
                    placeholder={field.placeholder}
                    invalid={isError(field.name)}
                  />
                  <FormFeedback>{errors["username"]}</FormFeedback>
                  <FormText>{field.helperText}</FormText>
                </FormGroup>
              ))}
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
AutoForm.propTypes = {};

function InputComponent(props) {
  const { type, label } = props;
  switch (type) {
    case "file":
    case "checkbox":
    case "radio":
    case "range":
    case "select":
    case "switch":
      return <CustomInput {...props} />;
    default:
      return (
        <>
          <Label>{label}</Label>
          <Input {...props} />
        </>
      );
  }
}
