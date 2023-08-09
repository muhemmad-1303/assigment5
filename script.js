document.addEventListener('DOMContentLoaded',fetchtask);
const task=document.getElementById('task');
const addTask=document.getElementById('addbtn');
const head=document.querySelector('.todocardhead');
const modal=document.querySelector('.modal')

addTask.addEventListener('click',add);
function fetchtask(item){
  let flag=item.message;
   if(flag=='post'){
    toastr.success('task added successfully!', 'Success');
   }
    const parentdiv=document.querySelector('.todocardbody');
    parentdiv.innerHTML=" "; 
    fetch('display.php')
    .then((response) => {
      console.log(response)
      return response.json()})
    .then(data => {
        data.forEach((item) => { 
            const itemDiv = document.createElement('div');
            const itemtext= document.createElement('span');
            const items=document.createElement('div');
            itemtext.textContent = `${item.task}`; 
            itemtext.id=item.id; 
            itemDiv.classList.add('color');
            parentdiv.appendChild(itemDiv);
            itemDiv.appendChild(itemtext);
            itemDiv.appendChild(items);
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
            items.appendChild(cmplt);  
          if(item.complete==1){
            itemtext.style.textDecoration='line-through';
            nwItem.parentNode.innerHTML=" ";
            const undo=document.createElement('button');
            undo.id=item.id
            undo.textContent='\u{21BA}';
            items.appendChild(undo);
            undo.addEventListener('click',function(){
              handlecmplt(this.id,"undo")
            })
            const nwdlt=document.createElement('button');
            nwdlt.textContent='🗑️'
            nwdlt.classList.add('dltbox');
            nwdlt.id=item.id
            items.appendChild(nwdlt);  
            
          }
        
          });
        const editbtn=document.querySelectorAll('.spanbox');
        editbtn.forEach((btn)=>{
            btn.addEventListener('click',function(){
                handleedit(this.id);
            });
        })
        const dltbtn=document.querySelectorAll('.dltbox');
        dltbtn.forEach((btn)=>{
            btn.addEventListener('click',function(){
                 modaldlt(this.id);

            });
        })
        const cmpltbtn=document.querySelectorAll('.cmpltbox');
        cmpltbtn.forEach((btn)=>{
            btn.addEventListener('mouseup',function(){
                handlecmplt(this.id,"complete");
            });
        })
    
    })
    .catch(error => {
    
    });

}
function handleedit(idn){
      const inputelement=document.createElement('input');
      inputelement.id='editinput';
      inputelement.value=document.getElementById(idn).textContent;
      const nwbtn=document.createElement('div');
      nwbtn.id="edit";
      nwbtn.textContent='save';
      const parentelmt=document.getElementById(idn).parentNode;
      parentelmt.id=idn;
      parentelmt.innerHTML=" ";
      parentelmt.append(inputelement,nwbtn)
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
        let m={meegae:"m",};
        fetchtask(m);
        
      })
        }  

 function handledlt(idn){  
  modal.classList.toggle('modalHidden');
    data={
    id:idn
   }
   console.log(data)
   fetch('delete.php', {
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    document.querySelector('.todocardbody').innerHTML='';
    let m={meegae:"m",};
    fetchtask(m);
    toastr.success('task deleted successfully!', 'Success');
   
    

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


function handlecmplt(idn,status){
  
    const obj={
        id:idn,
        stage:status
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

function modaldlt(idn){
  
  const modalParent=document.querySelector('.buttons');
  modalParent.innerHTML=" ";
  const dltbtn=document.createElement('button');
  dltbtn.id='delete';
  dltbtn.textContent="delete";
  const canclbtn=document.createElement('button');
  canclbtn.id='cancel';
  canclbtn.textContent="cancel";
  modalParent.append(canclbtn,dltbtn)
  modal.classList.toggle('modalHidden');
  dltbtn.addEventListener('click',function(){
      handledlt(idn);
      
  })
  canclbtn.addEventListener('click',function(){
    modal.classList.toggle('modalHidden');
    
})
}



