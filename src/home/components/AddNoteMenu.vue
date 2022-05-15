<template>
<div class="cross-container grey">
   <div class="cross"></div>
</div>

</template>

<style scoped>
    .cross-container{
        border: 2px solid rgb(94, 190, 142);
        border-radius: 15px;
        /* margin: 10px 10px; */
        height: 150px;
        width: 150px;    
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        cursor: pointer;        
    }

    .cross-container:hover{
         
        width: 280px; 
        height: 345px;   
    }

    .grey{
        background-color: rgb(240, 240, 240);
    }

     .cross {
      background: rgb(94, 190, 142);
      height: 100px;
      position: relative;

      width: 20px;
      border-radius: 5px;
      
    }
    .cross:after {
      background: rgb(94, 190, 142);
      content: "";
      height: 20px;
      left: -40px;
      border-radius: 5px;
      position: absolute;
      top: 40px;
      width: 100px;
    }    
</style>