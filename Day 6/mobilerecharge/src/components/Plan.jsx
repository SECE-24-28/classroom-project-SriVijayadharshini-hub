import React from "react";

export default function Plan(){
  const plans = [
    { id: 1, name: 'Basic', price: '₹49', desc: '1GB/day - 28 days' },
    { id: 2, name: 'Value', price: '₹149', desc: '2GB/day - 28 days' },
    { id: 3, name: 'Unlimited', price: '₹499', desc: 'Unlimited calls + 10GB data' }
  ];

  return (
    <div>
      <h2>Plans</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
        {plans.map(p=> (
          <div key={p.id} style={styles.card}>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div style={{fontWeight:700}}>{p.price}</div>
            <button style={styles.btn}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { padding: 12, border: '1px solid #eee', borderRadius: 6, background: 'white' },
  btn: { marginTop: 8, padding: '8px 12px', cursor: 'pointer' }
}