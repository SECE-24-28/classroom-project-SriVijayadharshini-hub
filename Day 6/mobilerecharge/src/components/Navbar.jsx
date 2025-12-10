import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav style={styles.nav}>
            <div style={styles.logo}><Link to="/" style={styles.logoLink}>RechargeNow</Link></div>
            <div style={styles.menu}>
                <Link to="/" style={styles.link}>Home</Link>

                <Link to="/recharge" style={styles.link}>Recharge</Link>
                <Link to="/plan" style={styles.link}>Plans</Link>
                <Link to="/history" style={styles.link}>History</Link>
                <Link to="/profile" style={styles.link}>Profile</Link>
            </div>
            <div style={styles.authButtons}>
                <Link to="/login" style={styles.btn}>Login</Link>
                <Link to="/signin" style={styles.btn}>Signin</Link>
            </div>
        </nav>
    );
}

const styles ={
   nav: {
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1976d2",
        color: "white"
    },
    logo: {
        fontSize: "1.3rem",
        fontWeight: "700"
    },
    logoLink: {
        color: "white",
        textDecoration: "none"
    },

    menu:{
        display:"flex",
        gap:"2rem",
       marginLeft: "2rem"

    },
    
    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: 500
    },
    authButtons: {
        display: "flex",
        gap: "1rem"
    },
    btn: {
        background: "white",
        borderRadius: "6px",
        padding: "0.5rem 1rem",
        color: "#1976d2",
        textDecoration: "none",
        fontWeight: 600
    }
};