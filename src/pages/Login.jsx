import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${email}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "10px" }}>Login</h1>
      <p>Please enter your credentials to continue.</p>

      <form
        onSubmit={handleLogin}
        style={{
          maxWidth: "350px",
          background: "#f1f1f1",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px"
          }}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
