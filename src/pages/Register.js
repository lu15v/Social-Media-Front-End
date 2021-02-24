import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { useForm } from "../util/hooks";

import { AuthContext } from "../context/auth";

const avatarOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    },
  },
  {
    key: "Elliot Fu",
    text: "Elliot Fu",
    value: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    },
  },
  {
    key: "Stevie Feliciano",
    text: "Stevie Feliciano",
    value: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
    },
  },
  {
    key: "Christian",
    text: "Christian",
    value: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
    },
  },
  {
    key: "Matt",
    text: "Matt",
    value: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    },
  },
  {
    key: "Justen Kitsune",
    text: "Justen Kitsune",
    value: "https://react.semantic-ui.com/images/avatar/small/justen.jpg",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/justen.jpg",
    },
  },
];

const Register = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const [avatar, setAvatar] = useState("");

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    avatar: "",
  });

  const [adduser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    adduser();
  }

  function onChangeAvatar(_, { value }) {
    values.avatar = value;
    setAvatar(value);
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="text"
          value={values.email}
          error={errors.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
        />
        <Dropdown
          placeholder="Choose an avatar"
          fluid
          selection
          options={avatarOptions}
          as={Form.Field}
          onChange={onChangeAvatar}
          value={avatar}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).filter((key) => key === "general").length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
    $avatar: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        avatar: $avatar
      }
    ) {
      id
      email
      token
      username
      avatar
    }
  }
`;

export default Register;
