function addVendor() {
  window.location = "form.html";
}

let countryId = '';




function saveButton(event) { 
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

    currencyContainer.innerHTML += `<option value="${id}"> ${obj.code}</option>`;
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
