function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id'); // Retrieve 'id' from query string
  console.log(id);
  editUser(id);
}

getQueryParam(); 

let countryId = '';


async function editUser(id) {
  const jwtToken = localStorage.getItem("jwtToken");
        const response = await fetch(`https://hastin-container.com/staging/api/vendor/get/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `BslogiKey ${jwtToken}`,
              'Content-Type': 'application/json'
            },
           
        });



        if (response.ok) {
            const user = await response.json();
            const data = user.data;
            console.log(data);

             document.getElementById('vendorName').value =data.vendorName;
            document.getElementById('vendorCode').value = data.vendorCode;
            document.getElementById('vendorType').value = data.vendorType;
            document.getElementById('add1').value =data.address;
            document.getElementById('country').value = data.country;
            document.getElementById('registrationNo').value =data.taxRegNo;
            document.getElementById('comRegistrationNo').value =data.companyRegNo;
            document.getElementById('currencyContainer').value =data.defaultCurrencyId;
            document.getElementById('add1').value =data.address1;
            document.getElementById('add2').value =data.address2;
            document.getElementById('country').value =data.country;
            document.getElementById('city').value =data.cityId;
            document.getElementById('zip').value =data.postalCode;
            document.getElementById('bankaccountName').value =data.bankAcctName;
            document.getElementById('bankaccountNumber').value =data.bankAccountNum;
            document.getElementById('bankName').value =data.bankName;
            document.getElementById('branch').value =data.bankBranchName;
            document.getElementById('swiftCode').value =data.bankSwiftCode;

            for (let i = 0; i < data.contactList.length; i++) {
              document.getElementById('Name').value = data.contactList[i].name;
              document.getElementById('Email').value = data.contactList[i].email;
              document.getElementById('phoneNumber').value = data.contactList[i].mobileNo;
              document.getElementById('chooseDefault').value = data.contactList[i].isDefault;
            }
            
  // let Name = document.getElementById('Name').value;
  // let Email = document.getElementById('Email').value;
  // let phoneNumber= document.getElementById('phoneNumber').value;
  // let chooseDefault = document.getElementById('chooseDefault').value;
            // editingUserId = id; 
        } else {
            throw new Error("Failed to fetch user data");
        }
}


async function saveButton(event) { 
  event.preventDefault();

  let vendorName = document.getElementById('vendorName').value;
  let vendorCode = document.getElementById('vendorCode').value;
  let vendorType = document.getElementById('vendorType').value;
  let registrationNo = document.getElementById('registrationNo').value;
  let comRegistrationNo = document.getElementById('comRegistrationNo').value;
  let currencyContainer = document.getElementById('currencyContainer').value;
  let add1 = document.getElementById('add1').value;
  let add2 = document.getElementById('add2').value;
  let country = document.getElementById('country').value;
  let city= document.getElementById('city').value;
  let zip = document.getElementById('zip').value;
  let Name = document.getElementById('Name').value;
  let Email = document.getElementById('Email').value;
  let phoneNumber= document.getElementById('phoneNumber').value;
  let chooseDefault = document.getElementById('chooseDefault').value;


  let nameError = document.getElementById('nameError');
  let vendorCodeError = document.getElementById('vendorCodeError');
  let typeError = document.getElementById('typeError');
  let taxRegistrationNoError = document.getElementById('taxRegistrationNoError');
  let comRegistrationNoError = document.getElementById('comRegistrationNoError');
  let currencyError = document.getElementById('currencyError');
  let addressError1 = document.getElementById('addressError1');
  let addressError2 = document.getElementById('addressError2');
  let countryError = document.getElementById('countryError');
  let chooseCityError = document.getElementById('chooseCityError');
  let zipError = document.getElementById('zipError');
  let Nameerror = document.getElementById('Nameerror');
  let Emailerror = document.getElementById('Emailerror');
  let numberError= document.getElementById('numberError');
  let defaultError= document.getElementById('defaultError');


  let valid = true;

  if (vendorName.trim() === "") {
      nameError.textContent = "Required*";
      nameError.style.color = "red";
      nameError.style.fontSize = "13px";
      nameError.style.paddingLeft = "15px";
      valid = false;
  }
  else {
      nameError.textContent = '';
  }
  if (vendorCode.trim() === "") {
     codeError.textContent = "Required*";
     codeError.style.color = "red";
     codeError.style.fontSize = "13px";
     codeError.style.paddingLeft = "15px";
      valid = false;
  }
  else {
     codeError.textContent = '';
  }

  if (vendorType.trim() === "") {
      typeError.textContent = "Required*";
      typeError.style.color = "red";
      typeError.style.fontSize = "13px";
      typeError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
      typeError.textContent = '';
   }

   if (registrationNo.trim() === "") {
     taxRegistrationNoError.textContent = "Required*";
     taxRegistrationNoError.style.color = "red";
     taxRegistrationNoError.style.fontSize = "13px";
     taxRegistrationNoError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
     taxRegistrationNoError.textContent = '';
   }

   if (comRegistrationNo.trim() === "") {
     comRegistrationNoError.textContent = " Required*";
     comRegistrationNoError.style.color = "red";
     comRegistrationNoError.style.fontSize = "13px";
     comRegistrationNoError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
     comRegistrationNoError.textContent = '';
   }

   if (currencyContainer.trim() === "") {
      currencyError.textContent = " Required*";
      currencyError.style.color = "red";
      currencyError.style.fontSize = "13px";
      currencyError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
      currencyError.textContent = '';
   }

   if (add1.trim() === "") {
      addressError1.textContent = " Required*";
      addressError1.style.color = "red";
      addressError1.style.fontSize = "13px";
      addressError1.style.paddingLeft = "15px";
       valid = false;
   }
   else {
      addressError1.textContent = '';
   }


//    if (add2.trim() === "") {
//     addressError2.textContent = " Required*";
//     addressError2.style.color = "red";
//     addressError2.style.fontSize = "13px";
//     addressError2.style.paddingLeft = "15px";
//      valid = false;
//  }
//  else {
//     addressError2.textContent = '';
//  }

   
   if (country.trim() === "") {
    countryError.textContent = " Required*";
    countryError.style.color = "red";
    countryError.style.fontSize = "13px";
    countryError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
    countryError.textContent = '';
   }

   if (city.trim() === "") {
       chooseCityError.textContent = " Required*";
       chooseCityError.style.color = "red";
       chooseCityError.style.fontSize = "13px";
       chooseCityError.style.paddingLeft = "15px";
       valid = false;
   }
   else {
       chooseCityError.textContent = '';
   }
   if (zip.trim() === "") {
      zipError.textContent = " Required*";
      zipError.style.color = "red";
      zipError.style.fontSize = "13px";
      zipError.style.paddingLeft = "15px";
      valid = false;
  }
  else {
      zipError.textContent = '';
  }





  if (Name.trim() === "") {
    Nameerror.textContent = " Required*";
    Nameerror.style.color = "red";
    Nameerror.style.fontSize = "13px";
    Nameerror.style.paddingLeft = "15px";
     valid = false;
 }
 else {
    Nameerror.textContent = '';
 }

 if (Email.trim() === "") {
     Emailerror.textContent = " Required*";
     Emailerror.style.color = "red";
     Emailerror.style.fontSize = "13px";
     Emailerror.style.paddingLeft = "15px";
     valid = false;
 }
 else {
     Emailerror.textContent = '';
 }
 if (phoneNumber.trim() === "") {
    numberError.textContent = " Required*";
    numberError.style.color = "red";
    numberError.style.fontSize = "13px";
    numberError.style.paddingLeft = "15px";
    valid = false;
}
else {
    numberError.textContent = '';
}

if (chooseDefault.trim() === "") {
  defaultError.textContent = " Required*";
  defaultError.style.color = "red";
  defaultError.style.fontSize = "13px";
  defaultError.style.paddingLeft = "15px";
  valid = false;
}
else {
  defaultError.textContent = '';
}







  if (valid) {
    const payload = {
        contactList: [
            {
                name: Name,
                email: Email,
                mobileNo: phoneNumber,
                isDefault: chooseDefault,
                id: null
            }
        ],
        vendorName: vendorName,
        vendorCode: vendorCode,
        vendorType: vendorType,
        taxRegNo: registrationNo,
        companyRegNo: comRegistrationNo,
        //defaultCurrencyId: currencyContainer,
        address1: add1,
        address2: add2,
        country: country,
        postalCode: zip,
        cityId: city,
        createdBy: "adf8906a-cf9a-490f-a233-4df16fc86c58",
        documentList: []
    };
    console.log(payload);
    
    const jwtToken = localStorage.getItem("jwtToken");

    // try {
        const response = await fetch('https://hastin-container.com/staging/api/vendor/create', {
            method: 'POST',
            headers: {
              'Authorization': `BslogiKey ${jwtToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Vendor Created Successfully:", result);
            alert("Vendor Created Successfully!");
         
            document.getElementById('vendorForm').reset();
        } else {
            throw new Error("Vendor creation failed!");
        }
    // } catch (error) {
    //     console.error("Error occurred:", error);
    //     alert("An error occurred while creating the vendor.");
    // }
}

}



////currency api

async function fetchCurrencies() {
  const jwtToken = localStorage.getItem("jwtToken");

  const response = await fetch(
    "https://hastin-container.com/staging/api/meta/currencies",
    {
      method: "GET",
      headers: {
        Authorization: `BslogiKey ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log("yes");

    const errorText = await response.data.text();
    console.error(
      `Failed to fetch currencies: ${response.status} - ${errorText}`
    );
    throw new Error(
      `Failed to fetch currencies: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  populateCurrencyDropdown(data.data);

  (error) => {
    console.log(error);
  };

  /////// Country Api

  const countryApi = await fetch(
    "https://hastin-container.com/staging/api/meta/country",
    {
      method: "GET",
      headers: {
        Authorization: `BslogiKey ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!countryApi.ok) {
    console.log("yes");

    const errorText = await countryApi.data.text();
    console.error(
      `Failed to fetch currencies: ${countryApi.status} - ${errorText}`
    );
    throw new Error(
      `Failed to fetch currencies: ${countryApi.status} - ${errorText}`
    );
  }

  const contryData = await countryApi.json();
  populateCountryDropdown(contryData.data);

  (error) => {
    console.log(error);
  };
}

function populateCurrencyDropdown(data) {
  const currencyContainer = document.getElementById("currencyContainer");
  for (let obj of data) {
    let id = obj.id;

    currencyContainer.innerHTML += `<option value="${obj.id}"> ${obj.name}</option>`;
  }
}
function populateCountryDropdown(data) {
  const countryContainer = document.getElementById("country");
  countryContainer.innerHTML = "";

  // Populate the dropdown with options

  for (let obj of data) {
    let id = obj.id;
    let option = document.createElement("option");
    option.value = id;
    option.textContent = obj.name;
    countryContainer.appendChild(option);
  }

 
  countryContainer.addEventListener("change", function () {
    const selectedId = countryContainer.value;
    countryId = countryContainer.value;

    /// city api 

    cityGet(selectedId);
  });
}

async function cityGet(event) {

  const jwtToken = localStorage.getItem("jwtToken");
  const cityApi = await fetch(
    "https://hastin-container.com/staging/api/countryCities/get",
    {
      method: "GET",
      headers: {
        Authorization: `BslogiKey ${jwtToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!cityApi.ok) {
    console.log("yes");

    const errorText = await cityApi.data.text();
    console.error(
      `Failed to fetch currencies: ${cityApi.status} - ${errorText}`
    );
    throw new Error(
      `Failed to fetch currencies: ${cityApi.status} - ${errorText}`
    );
  }

  const cityData = await cityApi.json();
  populateCityDropdown(cityData.data);

  (error) => {
    console.log(error);
  };
}

function populateCityDropdown(data) {
  const cityContainer = document.getElementById("city");
  const cityGet = data.filter((city)=>city.countryId === countryId);
  console.log(cityGet);
  
  for (let obj of cityGet) {
    let id = obj.id;
    cityContainer.innerHTML += `<option value="${id}"> ${obj.cityName}</option>`;
  }
}

fetchCurrencies();


function updateSerialNumbers() {
  const rows = document.querySelectorAll("#table2 tr");
  rows.forEach((row, index) => {
      row.querySelector(".serialno").textContent = index + 1; 
  });
}

function addRow() {
  const tableBody = document.getElementById("table2");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
             <td class="serialno"></td>
                <td>
                    <div class="form-floating ">
                        <input type="text" class="underInput form-control border-1 rounded-0 border-start-0 border-end-0 border-top-0 " style="box-shadow: none;" id="Name" placeholder=" Name" name=" Name">
                        <label for="name"> Name</label>
                        <div id="Nameerror"></div>
                    </div>
                </td>
                <td> 
                    <div class="form-floating ">
                        <input type="text" class="underInput form-control border-1 rounded-0 border-start-0 border-end-0 border-top-0 " style="box-shadow: none;" id="Email" placeholder=" Email" name=" Email">
                        <label for="Email"> Email</label>
                        <div id="Emailerror"></div>
                    </div>
                </td>
                <td>
                    <div class="form-floating ">
                        <input type="text" class="underInput form-control border-1 rounded-0 border-start-0 border-end-0 border-top-0 " style="box-shadow: none;" id="phoneno" placeholder=" phno" name=" phno">
                        <label for="phno">Phone No</label>
                        <div id="numError"></div>
                    </div>
                </td>
               
                <td>
                    <select class=" form-select border-1 rounded-0 border-start-0 border-end-0 border-top-0 border-bottom-0"style=""id="default" placeholder="default"  name="default">
                        <option value="" selected disabled class="mt-4">Is Default</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                    </select>
                    <label for="default"></label>
                    <div id="defaultError"></div>
                </td>
                <td>
                <i class='bx bxs-trash text-danger fs-3 ms-3 mt-2 delete-row' id="delete" ></i>
            </td>
  `;

  tableBody.appendChild(newRow);
  updateSerialNumbers(); 
}
function removeRow(event) {
  if (event.target.classList.contains("delete-row")) {
      const row = event.target.closest("tr");
      row.remove(); 
      updateSerialNumbers();
  }
}
document.getElementById("addRowButton").addEventListener("click", addRow); 
document.getElementById("table2").addEventListener("click", removeRow); 

