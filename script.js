const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

let i=0;

const updateExchangeRate = async () => 
    {
        let amt=document.querySelector(".amount input");
        let amtVal=amt.value;
        if(amtVal==="" || amtVal<1)
            {
                amtVal=1;
                amt.value=1;
            }
            const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
            let response = await fetch(URL);
            let data = await response.json();
            let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
            let finalAmount = amtVal*rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }

for(let select of dropdown)
    {
        for(code in countryList )
            {
                let newOpt=document.createElement("option");
                newOpt.innerText = code;
                newOpt.value=code;
                if(select.name === "from" && code==="USD")
                    {
                        newOpt.selected="selected";
                    }
                else if (select.name === "to" && code==="INR"){
                    newOpt.selected="selected";
                }
                select.append(newOpt);
            }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);//"change" is the event occuring, and evt is the object on which its occuring which is of Event type
        })
    }

const updateFlag = (element) => {
    let curCode = element.value;//the country code i m choosing uska value return
    let countryCode = countryList[curCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newImgSrc;
}


button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", ()=> {
    updateExchangeRate();
});



