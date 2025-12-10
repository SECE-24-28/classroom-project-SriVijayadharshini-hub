import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    // placeholder: perform validation / authentication here
    console.log("login", { email, password });
    // navigate to home after 'login'
    navigate('/');
  }

  return (
    <div style={{maxWidth:500}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" style={styles.input} required />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" style={styles.input} required />
        </div>
        <div>
          <button style={styles.btn} type="submit">Sign in</button>
          <Link to="/signin" style={{marginLeft:12}}>Create account</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  input: { width: '100%', padding: '8px', marginTop: 4, boxSizing: 'border-box' },
  btn: { padding: '8px 14px', borderRadius: 6, cursor: 'pointer' }
}