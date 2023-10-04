let myIp = document.getElementById("myIp");
let lath = document.getElementById("lat");
let longh = document.getElementById("long");
let cityh = document.getElementById("city");
let regionh = document.getElementById("region");
let orgh = document.getElementById("org");
let hosth = document.getElementById("host");
let iMap = document.getElementById('iMap');
// myIpAddress = getCookie("ipAddress");
myIpAddress = localStorage.getItem("ipAddress");
const url = `http://ip-api.com/json/${myIpAddress}`;
let lat = "";
let lang = "";
let city = "";
let postalCode = "";
let region = "";
let orgName = "";
let hostName = "";
let time = "";
let currTime =""
myIp.innerHTML = `${myIpAddress}`;

async function getIpDAta() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    lat = data.lat;
    long = data.lon;
    city = data.city;
    postalCode = data.zip;
    region = data.regionName;
    orgName = data.org;
    hostName = data.isp;
    time = data.timezone;
    lath.innerText = `${lat}`; //latitude
    longh.innerText = `${long}`;
    cityh.innerText = `${city}`;
    regionh.innerText = `${region}`;
    hosth.innerText = `${hostName}`;
    orgh.innerText = `${orgName}`;
    iMap.src=`https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed`;
    timeStamp(time);
    document.getElementById('timeZone').innerText=`${time}`;
    document.getElementById('dateandTime').innerText=`${currTime}`;
    document.getElementById('zipcode').innerText=`${postalCode}`;
    postalFetch(postalCode)
  } catch (error) {
    console.log("Your Error is: ", error);
  }
}
function timeStamp(timezone){
    // current datetime string in America/Chicago timezone
let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: timezone });

// create new Date object
let date_chicago = new Date(chicago_datetime_str);

// year as (YYYY) format
let year = date_chicago.getFullYear();

// month as (MM) format
let month = ("0" + (date_chicago.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_chicago.getDate()).slice(-2);

// date time in YYYY-MM-DD format
let date_time = year + "-" + month + "-" + date;

currTime = date_time;

// "2021-03-22"
}
getIpDAta();

// fetch for postal codes

async function postalFetch(pincode){
    try {
      const postalUrl = ` https://api.postalpincode.in/pincode/${pincode}`
      let response = await fetch(postalUrl);
      let result = await response.json();
      document.getElementById('founded').innerText=`${result[0].Message}`;
      renderCardstoUI(result[0].PostOffice);
    }
    catch(error){
      console.log('your Postal error is : ', error);
    }
}

// ----------------------------------
// render Cards to ui
function renderCardstoUI(dataList){
  const cardContainer= document.getElementById('card');
  
  dataList.forEach((item)=>{
    const divElement =document.createElement('div') ;
    divElement.className = "mycard";
    divElement.innerHTML = `<table id="mycard-table">
    <tr class="mycard-row">
        <th>Name </th>
        <th>:</th>
        <th> ${item.Name}</th>
    </tr>
    <tr class="mycard-row">
        <th>Branch Type </th>
        <th>:</th>
        <th> ${item.BranchType}</th>
    </tr>
    <tr class="mycard-row">
        <th>Delivery Status </th>
        <th>:</th>
        <th> ${item.DeliveryStatus}</th>
    </tr>
    <tr class="mycard-row">
        <th>District </th>
        <th>:</th>
        <th> ${item.District}</th>
    </tr>
    <tr class="mycard-row">
        <th>Division </th>
        <th>:</th>
        <th> ${item.Division}</th>
    </tr>
</table>`;
cardContainer.append(divElement);
  });
}



// Retrieve data from the cookie by key (replace 'key' with your specific key)
function getCookie(key) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return null; // Return null if the key is not found
}
