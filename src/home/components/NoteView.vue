<template>
    <div class="note-container grey">
        <div v-if="!isEditing" class="title-label">
           <h3 style="padding:auto;">{{noteModel.title}}</h3>
        </div>
        <div v-else class="title-label">
            <input type="text" class="input-title" v-model="noteModel.title">
        </div>
        <div v-if="!isEditing" class="text-content-form">
            {{noteModel.text}}
        </div>
        <div v-else class="text-content-form">
            <textarea class="input-text" v-model="noteModel.text"></textarea>
        </div>
        <div class="last-update">
            <em>Last update: {{new Date(noteModel.lastUpdate).toLocaleString()}}</em>
        </div>
        <div v-if="!isEditing" class="button-group">
            <div @click.prevent="isEditing = true" class="edit-save button">Edit</div>
            <div @click.prevent="deleteNote()" class="delete button">Delete</div>
        </div>   
        <div v-else class="button-group">
            <div @click.prevent="save()" class="edit-save button">Save</div>    
        </div> 
        
    </div>
</template>

<script>
import {noteService} from "../../services"
export default {
    props: ['note'],  
    data() {
        return {
            isEditing: false,
            noteModel: {}
        }
    },
    created(){
        this.noteModel = this.note
    },
    methods: {
        save: function(e){
            this.isEditing = false;

            noteService.edit(this.noteModel).then((note) => this.noteModel = note)
        },
        deleteNote: function(e) {
            noteService.deleteNote(this.noteModel.id).then(() => {
                this.$emit('getNotesEvent')
            })
        }
    }

}
</script>

<style scoped>

    .note-container {
        margin: 10px 10px;
        padding: 5px 5 px;

        width: 250px;
        height: 345px;

        border: 2px solid rgb(94, 190, 142);
        border-radius: 15px;
      
    }
    .title-label h3 {
        margin: 0;
        padding: 0;
    }
    .grey{
        background-color: rgb(240, 240, 240);
    }

    .button{
        cursor: pointer;
        text-align: center;    
        color: white;  
        width: 100px;
        
        padding: 5px 0;
        margin: 10px auto;

        transition: 0.3s;
    }

    .delete{
        border: 2px solid rgb(204, 74, 74);
        border-radius: 7px;

        background-color: rgb(204, 74, 74);
    }
    
    .button-group{
        
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-content: center;
        flex-wrap: nowrap;
    }

    .title-label{
        
        text-align: center;
        line-height: 28px;
        border-bottom: 2px solid rgb(94, 190, 142);
        border-radius: 15px;
        height: 28px;
    }
    
    .text-content-form{
        box-sizing: border-box;
        padding: 5px 5px;
        width: auto;
        width: 100%;
        word-wrap: break-word;
        height: 220px;
        text-align: justify;
    }
    .last-update{
        margin: 10px 10px;
        text-align: center;
    }
    .edit-save{   
        border: 2px solid rgb(94, 190, 142);
        border-radius: 7px;

        background-color: rgb(94, 190, 142);
        
    }

    .edit-save:hover{
        color: rgb(94, 190, 142);
        background-color: rgb(240, 240, 240);
               
    }

    .delete:hover{
        color: rgb(204, 74, 74);
        background-color: rgb(240, 240, 240);
    }

    .input-title, .input-text{
        width: 100%;
        font-family: "Radio-Canada";
        margin: 0;
        padding: 0;
        border: 0;       
         
    }

    .input-text{
        border-radius: 5px;
        height: 100%;
        resize: none;
        font-size: 12pt;
    }
    
    .input-title{
        height: 95%;
        text-align: center;
        font-size: 14pt;
        border-radius: 15px;
        font-weight: bold;
    }

    
</style>
