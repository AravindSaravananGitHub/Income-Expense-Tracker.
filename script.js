
// Getting Html id and class

const balance =document.querySelector("#balance");
const inc_amt=document.querySelector("#inc-amt");
const exp_amt=document.querySelector("#exp-amt");
const trans=document.querySelector("#trans");
const form=document.querySelector("#form");
const description=document.querySelector("#desc");
const amount=document.querySelector("#amount");

/*
const dummyData=[
    {id:1, description:"flower", amount:-100},
    {id:2, description:"food", amount:-1000},
    {id:3, description:"salary", amount:40000},
    {id:4, description:"Toy", amount:-150},
    {id:4, description:"Petrol", amount:150}
];

let transactions=dummyData;
*/

const localStorageTrans=JSON.parse(localStorage.getItem("exp_inc"));

let transactions=localStorage.getItem("exp_inc")!==null?localStorageTrans:[];

function loadTransactionDetail(transaction){
    //console.log(transaction);
    const sign=transaction.amount<0?"-":"+";
    const item=document.createElement("li");
    item.classList.add(transaction.amount<0?"exp":"inc");
    item.innerHTML=`
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick='removeTrans(${transaction.id})'>X</button>
    `;
    trans.appendChild(item);
}

function removeTrans(id){
    if(confirm("Are you sure you want to delete Transaction from Aravind's Database?")){
        transactions=transactions.filter((transaction)=>transaction.id!=id);
        updateLocalStorage();
        config();
    }else{
        return;
    }
}

function updateAmount(){
    const amount=transactions.map((transaction)=>transaction.amount);
    //console.log(amount);
    const total=amount.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    balance.innerText=`${total}`;

    const income=amount.filter((item)=> item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    inc_amt.innerText=`${income}`;

    const expense=(amount.filter((item)=> item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
    exp_amt.innerText=`${expense}`;
}

function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetail);
    updateAmount();
}

function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()=="" || amount.value.trim()==""){
        alert("Please Enter Description and Amount Properly");
    }
    else{
        const transaction={
            id:uniqueid(),
            description: description.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        loadTransactionDetail(transaction);
        description.value="";
        amount.value="";
        updateAmount();
        updateLocalStorage();
    }
}

function uniqueid(){
    return Math.floor(Math.random()*1000000000)
}

form.addEventListener("submit", addTransaction);

// Initial Function
window.addEventListener("load",function(){
    config();
});

function updateLocalStorage(){
    localStorage.setItem("exp_inc", JSON.stringify(transactions));
}
