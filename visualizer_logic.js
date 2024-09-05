let container = document.body.children[1];
let graph = document.body.children[1].children[0];
let create = document.body.children[2].children[0];
let sort = document.body.children[2].children[1];
let sort_type = document.body.children[0].children[0];
let arrayclass = document.body.children[3];
console.log(arrayclass);
let select_sort = "";
let mainarr;
let time=0;
let n = 50;
function randomarr(){
    let arr= [];
    for(let i=0;i<n;i++){
        let x = Math.random();
        arr.push(x);
    }
    return arr;
}

function generate(array,p=-1,q=-1){
    graph.innerHTML= "";
    for(let i=0;i<n;i++){
        let x = array[i];
        let bar = document.createElement("div");
        bar.setAttribute("class","bar");
        bar.setAttribute("style",`width: 30px; height: ${x*100}%;`);
        if(p==i || q==i) {bar.setAttribute("class","bar selectedbar");}
        graph.appendChild(bar);
    }
    
}

function perform_sort(sorting){
    if(sorting=="" || sorting=="sorttypes") {alert("choose a sorting algorithm");return 0;}
    else if(sorting=="bubble") {bubblesort();return 1;}
    else if(sorting=="insertion") {insertionSort();return 1;}
    else if(sorting=="selection") {selectionSort();return 1;}
    return 0;
}

function bubblesort(){
    time=0;
    for(let i=0;i<n-1;i++){
        for(let j=0;j<n-i-1;j++){
            setTimeout(() => {
                if(mainarr[j + 1] < mainarr[j]){
                    let temp = mainarr[j + 1];
                    mainarr[j + 1] = mainarr[j];
                    mainarr[j] = temp;
                }
                generate(mainarr,j,j+1);
            }, time * 2);
            time++;
            
        }
    }
    setTimeout(() => {
        generate(mainarr);
    }, time*2);
}


function insertionSort() {
    time=0;
    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0; j--) {
            setTimeout(()=>{
                if(mainarr[j] < mainarr[j - 1]){
                    let temp = mainarr[j - 1];
                    mainarr[j - 1] = mainarr[j];
                    mainarr[j] = temp;
                    generate(mainarr,j,j);
                }
            },time*2);
            time++;
        }
    }
    setTimeout(() => {
        generate(mainarr);
    }, time*2);
}


function selectionSort() {
    
    time=0;
    for (let i = 0; i < n-1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            setTimeout(()=>{
                if (mainarr[j] < mainarr[min_idx]) {
                    min_idx = j;
                    generate(mainarr,i,min_idx);
                }
            },time*2);
            time++;
        }
        setTimeout(()=>{
            if (min_idx !== i) {
                let temp = mainarr[i];
                mainarr[i] = mainarr[min_idx];
                mainarr[min_idx] = temp;
                generate(mainarr,i,min_idx);
            }
        },time*2);
    }
    setTimeout(() => {
        generate(mainarr);
    }, time*2);
}


sort_type.addEventListener("click",(e)=>{
    select_sort = e.target.className;
    let navtypes = sort_type.children;
    navtypes[0].setAttribute("style","color:white;");
    navtypes[1].setAttribute("style","color:white;");
    navtypes[2].setAttribute("style","color:white;");
    
    let navtype = document.getElementsByClassName(select_sort)[0];
    if(select_sort!="sorttypes"){
        navtype.setAttribute("style","color:purple;");
    }
})

sort.addEventListener("click",()=>{
    let result = perform_sort(select_sort);
    setTimeout(()=>{
        if(result==1){
            let st = "[ ";
            for(let i=0;i<n-1;i++){
                st += Math.floor(mainarr[i]*100);
                st += " ,";
            }
            st += Math.floor(mainarr[n-1]*100);
            st += " ]";
            arrayclass.innerHTML += "<br> <br>" + "Sorted Array: " + st;
        }
        
    },time*2);
})


create.addEventListener("click",()=>{
    let temparr = randomarr();
    let st = "[ ";
    for(let i=0;i<n-1;i++){
        st += Math.floor(temparr[i]*100);
        st += " ,";
    }
    st += Math.floor(temparr[n-1]*100);
    st += " ]";
    arrayclass.textContent = "Generated Array: "+st;
    generate(temparr);
    mainarr = temparr;
})

let temparr = randomarr();
let st = "[ ";
for(let i=0;i<n-1;i++){
    st += Math.floor(temparr[i]*100);
    st += " ,";
}
st += Math.floor(temparr[n-1]*100);
st += " ]";
arrayclass.textContent = "Generated Array: "+st;
generate(temparr);
mainarr = temparr;
