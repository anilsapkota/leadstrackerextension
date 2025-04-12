

let myLeads = [];
let inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));


//check if leadsFromLocalStorage is truthy
// if so, set myLeads to its value and call render()

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


function render(leads) {
    let listItems = "";
    for (let i = 0; i<leads.length;i++){
        listItems +=
        `
            <li> 
                <a href='${leads[i]}' target='_blank'> 
                        ${leads[i]} 
                </a> 
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}


//make delete button work by clearing local storage and myLeads array and then rendering
deleteBtn.addEventListener('click',() =>{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});



//make the save tab button work 
tabBtn.addEventListener('click',() =>{

   chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads',JSON.stringify(myLeads));
        render(myLeads);

        })

    
   });

//save input button
inputBtn.addEventListener('click',() =>{
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem('myLeads',JSON.stringify(myLeads));

    render(myLeads);
    
});




