import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { login } from "./api";

function useField(initial) {
  const [value, setValue] = useState(initial);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return [value, handleChange];
}

function Input(props) {
  return (
    <input
      className="bg-gray-200 w-full py-3 px-2 mt-1"
      type="text"
      {...props}
    />
  );
}

function Label({ htmlFor, ...rest }) {
  return <label className="pb-2 text-lg" htmlFor={htmlFor} {...rest}></label>;
}

function LoginForm({ onSubmit, isLoading }) {
  const [email, handleEmailChange] = useField("");
  const [password, handlePasswordChange] = useField("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(email, password);
  }

  const buttonColor = isLoading ? "bg-gray-400" : "bg-purple-600";

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium mb-6">Log Into My Account</h1>
      <div className="mb-4 w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="email@able.co"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-4 w-full">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="..."
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        disabled={isLoading}
        className={`w-full text-white py-3 font-semibold ${buttonColor}`}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <a className="text-center block mt-4 text-purple-700">Forgot password?</a>
    </form>
  );
}

function LoggedIn({ onLogOut }) {
  return (
    <div>
      <h4 className="text-center text-lg"> You are logged in ! 🎉</h4>;
      <img
        src="https://previews.123rf.com/images/mandygodbehear/mandygodbehear1302/mandygodbehear130200078/17991022-dog-party-animal-celebrating-birthday-or-anniversary.jpg"
        alt="celebrating dog"
      />
      <button
        className={`w-full text-white py-3 font-semibold bg-purple-600`}
        onClick={onLogOut}
      >
        Log Out 😞
      </button>
    </div>
  );
}

function App({ onLoggedIn = () => {} }) {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(email, password) {
    setLoading(true);
    login(email, password).then(() => {
      setLoading(false);
      setLoggedIn(true);
      onLoggedIn();
    });
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div className="bg-gray-100 w-full min-h-screen pt-40 font-sans text-gray-800">
      <div className="mx-auto shadow xl:w-1/3 md:w-1/2  py-8 px-6 rounded-lg bg-white">
        {loggedIn ? (
          <LoggedIn onLogOut={handleLogout} />
        ) : (
          <LoginForm onSubmit={handleSubmit} isLoading={loading} />
        )}
      </div>
    </div>
  );
}

export default App;
