import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    // placeholder: create account
    console.log('create', { name, email });
    navigate('/login');
  }

  return (
    <div style={{maxWidth:600}}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12}}>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} style={styles.input} required />
        </div>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" style={styles.input} required />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" style={styles.input} required />
        </div>
        <div>
          <button style={styles.btn} type="submit">Create account</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  input: { width: '100%', padding: '8px', marginTop: 4, boxSizing: 'border-box' },
  btn: { padding: '8px 14px', borderRadius: 6, cursor: 'pointer' }
}