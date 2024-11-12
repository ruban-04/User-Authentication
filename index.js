document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

function MyButton(event) {
    event.preventDefault();

    // Get form input values

    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;

    // Error message elements

    let nameError = document.getElementById('nameError');
    let passwordError = document.getElementById('passwordError');

    let valid = true;

    // Validation for username

    if (userName.trim() === "") {
        nameError.textContent = "Username is required*";
        nameError.style.color = "red";
        nameError.style.fontSize = "13px";
        valid = false;
    } else {
        nameError.textContent = '';
    }

    // Validation for password

    if (password.trim() === "") {
        passwordError.textContent = "Password is required*";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "13px";
        valid = false;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "13px";
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    
    if (valid) {
        const data = {
            userName: userName,
            password: password,
        };
       
async function submitForm(data) {
    try {
      
        const response = await fetch('https://hastin-container.com/staging/app/auth/login',
             {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });
      
        if (response.ok) {
            const result = await response.json();
            console.log("User Login Successfully:", result);
            alert("User Login Successfully!");           
            document.getElementById('formpage').reset();
            
        } else {
           
            throw new Error("Login failed");
        }
    } catch (error) {
        
        console.error("Error:", error);
        alert("There was an error submitting the form.");
    }
}
       
      submitForm(data);
    }
}
