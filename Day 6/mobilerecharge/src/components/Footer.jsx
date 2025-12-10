import React from "react";

export default function Footer(){
    return(
        < footer style={styles.footer}>
            <p> {new Date().getFullYear()} RecahrgeNow - ALL Rights Reversed</p>
        </footer>
    );
}

const styles={
    footer:{
        padding:"1rem",
        textAlign:"center",
        borderTop:"1px solid #ddd",
        background:"#fafafa",
        flexShrink: 0
    }
};