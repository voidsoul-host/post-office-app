
// elements
const ipUrl = "https://api.ipify.org?format=json";
const ip = document.getElementById("ip");
const searchbtn = document.getElementById("searchbtn");
let ipAddress = "";
// function
async function ipApi() {
    try {
        let response = await fetch(ipUrl);
        let data = await response.json();
        ip.innerHTML = data.ip;
        ipAddress = data.ip;
        
    } catch (error) {
        console.log(error);
    };
    
};
ipApi();


// async function ipData()
// https://voidsoul-host.github.io/youtube-clone/
searchbtn.addEventListener('click', ()=>{
    document.cookie= `ipAddress=${ipAddress}; path=./result.html`;
    window.location.href="https://voidsoul-host.github.io/POST-OFFICE-APP/result.html"
});