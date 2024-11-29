let editingUserId = null; 

async function fetchUserProfile() {
   
    try {
        const jwtToken = localStorage.getItem('jwtToken');
        
        if (!jwtToken) {
            alert("Authorization token is missing.");
            return;
        }

        const response = await fetch('https://hastin-container.com/staging/auth/new/fetch/my-profile', {
            method: 'GET',
            headers: {
                'Authorization': `BslogiKey ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            const { userName } = data.data;
            console.log(userName)

            document.getElementById('userName').textContent = userName;
          

        } else {
            throw new Error("Failed to fetch user profile");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the user profile.");
    }
}
function addVendor() {
    window.location = "form.html";
  }


async function vendortable() {
    try {
        const jwtToken = localStorage.getItem('jwtToken');
        
        if (!jwtToken) {
            alert("Authorization token is missing.");
            return;
        }

        const payload = {
            "pagination": {
                "index": 1,
                "rowCount": -1,
                "searchObj": null,
                "sortingObj": null
            }
        };

        const response = await fetch('https://hastin-container.com/staging/api/vendor/search/active', {
            method: 'PUT',
            headers: {
                'Authorization': `BslogiKey ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)  
        });

        if (response.ok) {
            const data = await response.json();
            const users = data.data.tableData; 

            displayTable(users);

        } else {
            throw new Error("Failed to fetch user profile");
        }

    } catch (error) {
        console.error("Error:", error);
    //     alert("There was an error fetching the user profile.");
     }
}

function displayTable(users) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    users.forEach((user,index) => {
        const row = `<tr>
       
        <td>${index + 1}</td> 
            <td>${user.vendorName}</td>
            <td>${user.vendorCode}</td>
            <td>${user.vendorType}</td>
            <td>${user.address}</td>
            <td>${user.country}</td>
            <td>${user.status}</td>
            <td>
                <i class='bx bx-edit-alt text-success fs-5' data-id="${user.id}"></i>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    const editIcons = tableBody.querySelectorAll('.bx-edit-alt');
    editIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const userId = event.target.getAttribute('data-id');
            editUser(userId);
        });
    });
}

function editUser(id) {
    window.location.href = `form.html?id=${id}`;
}


fetchUserProfile();
vendortable();

  
function logoutClickButton(){
    localStorage.removeItem("jwtToken");
    alert("logout successfully");
    window.location.href = "index.html";
}