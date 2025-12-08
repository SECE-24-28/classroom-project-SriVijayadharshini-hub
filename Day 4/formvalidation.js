const loginForm=document.getElementById("loginform");
if(loginForm){
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();

        const username=document.getElementById("username").value.trim();
        const password=document.getElementById("password").value.trim();

        if(username===""||password===""){
            alert("Please fill in all fields!");
            return;
        }
       
        window.location.href="landing.html";

        if(username===""||password===""){
            alert("Please fill in all fields!");
            return;
        }

        if(username==="admin" && password==="1234"){
            alert("Login sucessful!");
            window.location.href="landing.html";
        }else{
            alert("Invalid username or password!");
        }
    });
}

const signupForm=document.getElementById("signupForm");
if(signupForm){
    signupForm.addEventListener("submit",function(event){
        event.preventDefault();

        const fullname=document.getElementById("fullname").value.trim();
        const email=document.getElementById("email").value.trim();
        const username=document.getElementById("username").value.trim();
        const password=document.getElementById("password").value.trim();

        if(!fullname || !email || !username || !password){
            alert("Please fill in all fields");
            return;
        }

        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            alert("Please enter a valid email address");
            return;
        }

        if(username.length < 3){
            alert("Username must be at least 3 characters long.");
        }

        const passPattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
        if(!passPattern.test(password)){
           alert("Password must be at least 6 characters long and contain one uppercase letter, one number, and one special character.");
            return; 
        }

        alert("Account created successfully!");
        window.location.href = "index.html";

    });
}