<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
   






</head>
<body>
    <div class="main">
        <div class="todocard">
            <div class="todocardhead">
                <form id="form">
                <input type="text" name="task" id="task" >
                <div id="save">
                <input type="submit" value="AddTask" id="addbtn">
                </div>
                </form>
            
            </div>
            <div class="todocardbody">

            </div>
        </div>
    </div>
    <div class="modal modalHidden">
        <div class="modalContent">
            <div class="text">Are you sure you want to delete</div>
            <div class="buttons">
               
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
   
 
    
    
    
</body>
</html>