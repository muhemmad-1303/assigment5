document.addEventListener('DOMContentLoaded',fetchtask);
const task=document.getElementById('task');
const addTask=document.getElementById('addbtn');
const head=document.querySelector('.todocardhead')

addTask.addEventListener('click',add);





function fetchtask(data){
    let flag=data.message;
   
   if(flag=='post'){
    toastr.success('task added successfully!', 'Success');
   }
  
     
    const parentdiv=document.querySelector('.todocardbody');
    fetch('display.php')
    .then(response => response.json())
    .then(data => {
        
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            const itemtext= document.createElement('span');
            const items=document.createElement('div');

            itemtext.textContent = `${item.task}`; 
            itemtext.id=item.id; 
            itemDiv.classList.add('color');
            parentdiv.appendChild(itemDiv);
            itemDiv.appendChild(itemtext);
            itemDiv.appendChild(items);
          
            if(item.complete==0){
            const nwItem=document.createElement('button');
            nwItem.textContent='✏️';
            nwItem.classList.add('spanbox');
            nwItem.id=item.id
            items.appendChild(nwItem);
            const nwdlt=document.createElement('button');
            nwdlt.textContent='🗑️'
            nwdlt.classList.add('dltbox');
            nwdlt.id=item.id
            items.appendChild(nwdlt);  
            const cmplt=document.createElement('button');
            cmplt.textContent='✔️'
            cmplt.classList.add('cmpltbox');
            cmplt.id=item.id
            items.appendChild(cmplt);  }
            else{
                let text=itemtext.textContent
                itemDiv.textcontent=text;
                itemDiv.style.textDecoration='line-through';
            }


        });
        const editbtn=document.querySelectorAll('.spanbox');
        editbtn.forEach((btn)=>{
            btn.addEventListener('mouseup',function(){
                handleedit(this.id);
            });
        })
        const dltbtn=document.querySelectorAll('.dltbox');
        dltbtn.forEach((btn)=>{
            btn.addEventListener('mouseup',function(){
                handledlt(this.id);
            });
        })
        const cmpltbtn=document.querySelectorAll('.cmpltbox');
        cmpltbtn.forEach((btn)=>{
            btn.addEventListener('mouseup',function(){
                handlecmplt(this.id);
            });
        })
    
    })
    .catch(error => {
    
    });

}
function handleedit(idn){
      head.innerHTML= ' ';
  
      const inputelement=document.createElement('input');
      inputelement.id='editinput';
      inputelement.value=document.getElementById(idn).textContent;
      const nwbtn=document.createElement('div');
      nwbtn.id="edit";
      nwbtn.textContent="save";
      head.append(inputelement,nwbtn);
      const updatedData = {
        id: idn
      };
      nwbtn.addEventListener('click',function(){
        update(updatedData,inputelement)
      })
      
      
    }

 function update(updatedData,inputelement){

    let taskvalue=inputelement.value;
    const obj={...updatedData,task:taskvalue}
    fetch('update.php', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        toastr.success('task updated successfully!', 'Success');
        document.querySelector('.todocardbody').innerHTML='';
        head.innerHTML="<form id='form'><input type='text' name='task' id='task' placeholder='ADD NEW TASK'><div id='save'><input type='submit' value='AddTask' id='addbtn'></div> </form>"
        let m={meegae:"m",};
        fetchtask(m);
        
      })
      



 }  

 function handledlt(idn){
   const data={
    id:idn
   }
   console.log(data)
   fetch('delete.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    toastr.success('task deleted successfully!', 'Success');
    document.querySelector('.todocardbody').innerHTML='';
    let m={meegae:"m",};
    fetchtask(m);

  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
  
   

 }

function add(event){
    event.preventDefault();
    const obj={
        task:task.value,
    }
    fetch('add.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        
        
        document.querySelector('.todocardbody').innerHTML='';
        fetchtask(data);
    
      })
      task.value=" ";
      
     
    
}


function handlecmplt(idn){
    const obj={
        id:idn
    }
    fetch('complt.php', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        
        document.querySelector('.todocardbody').innerHTML='';
        let m={meegae:"m",};
    fetchtask(m);

       
        
      })    
   
}



