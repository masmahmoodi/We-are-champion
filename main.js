import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://datebase-23048-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseementinDB = ref(database, "endorsements")
const input = document.querySelector('.input')


const publish = document.querySelector('.publish')
const parent = document.querySelector(".pulish-endorsement")
publish.addEventListener("click",()=>{
  let inputVal = input.value
  if (inputVal !== ""){
    push(endorseementinDB,inputVal)
    clearScreen()
  }
})


function clearScreen(){
    input.value = ""
}

onValue(endorseementinDB,function(snapshot){
  if(snapshot.exists()){
    let endorseemensArray = Object.entries(snapshot.val())
    parent.innerHTML =""
    for(let i=0;i<endorseemensArray.length;i++){
     publishingEndorsement(endorseemensArray[i])
      
    }
  }else{
    parent.innerHTML= "<span style='color:red'>databse is empty</span>"
  }

})

function publishingEndorsement(item){
    const div = document.createElement("div")
    div.textContent = item[1]
    div.setAttribute("class","dives")
    parent.append(div)

    div.addEventListener("click",()=>{
      let fullPathOfItemsInDB = ref(database, `endorsements/${item[0]}`)
      remove(fullPathOfItemsInDB)
    })

}

