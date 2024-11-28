document.getElementById('showPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});



function MyButton(event) {
    event.preventDefault();

    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let nameError = document.getElementById('nameError');
    let passwordError = document.getElementById('passwordError');
    let valid = true;

    if (userName.trim() === "") {
        nameError.textContent = "Username is required*";
        nameError.style.color = "red";
        nameError.style.fontSize = "13px";
        valid = false;
    }
    else if (userName !=="ebrain") {
        nameError.textContent = "Username Invalid*";
        nameError.style.color = "red";
        nameError.style.fontSize = "13px";
        valid = false;
    } 
    else {
        nameError.textContent = '';
    }

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
    } 
    else if (password !=="Ji#993te") {
        passwordError.textContent = "Password is wrong*";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "13px";
        valid = false;
    } 
    else {
        passwordError.textContent = '';
    }

    if (valid) {
        const data = { userName: userName, password: password };
        submitForm(data);
    }
}


async function submitForm(data) {
    try {
        const response = await fetch('https://hastin-container.com/staging/app/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("User Login Successfully:", result);

          
            localStorage.setItem('opaque', result.data.opaque);
            localStorage.setItem('accessCode', result.data.accessCode);
            localStorage.setItem('jwtToken', result.data.jwt);


           
            document.getElementById('formpage').reset();
            openOtpModal();
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        console.error("Error:", error);
        // alert("There was an error submitting the form.");
    }
}



function closeOtpModal() {
    document.getElementById('otpModal').style.display = 'none';
}



function openOtpModal() {
  
    const opaque = localStorage.getItem('opaque');
    const accessCode = localStorage.getItem('accessCode');
    
    
    document.getElementById('otpPrefix').textContent = opaque; 
    document.getElementById('otpInput').value = accessCode; 

   
    document.getElementById('otpModal').style.display = 'block';
    startTimer()

    
    document.getElementById('Submit').onclick = function() {
        // document.getElementById("resendOtp").innerText = "Resend OTP";{
       
        const payload = {
            opaque: opaque,
            accessCode: accessCode,
        };
        
        
        resendOtp(payload);
        startTimer()
    };
}
let timerInterval;
function startTimer() {
    let timeRemaining = 30;  
    document.getElementById('timer').textContent = "01:00";

    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 30);
        let seconds = timeRemaining % 30;

        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("OTP expired. Please request a new OTP.");
        }
    }, 1000); 
}



async function resendOtp(data) {
    try {
        
        const jwtToken = localStorage.getItem('jwtToken'); 
        
        if (!jwtToken) {
            alert("Authorization token is missing.");
            return;
        }

       
        const response = await fetch('https://hastin-container.com/staging/app/auth/access-code/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `BslogiKey ${jwtToken}`, 
            },
            body: JSON.stringify(data), 
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Submit Successfully:", result);
            // alert("Submit Successfully!");           
            document.getElementById('formpage').reset();
            clearInterval(timerInterval)
            // window.location="vendor.html"
            window.location = "vendor.html";
        } else {
            throw new Error("Login failed");
        }
     
    }
     catch (error) {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
    }
}

