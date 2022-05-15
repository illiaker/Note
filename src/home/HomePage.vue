<template>
    <div>
        <home-nav-bar @assignNotes="assignNotes"></home-nav-bar>

        <div class="notes-list">
            <note-view @get-notes-event="getNotes" v-for="note in notes" :key="note.id" :note="note"></note-view>
            <div class="add-note">
                <add-note-menu @click.prevent="createNew()"></add-note-menu>
            </div>
        </div>  

       
    </div>
</template>

<script>
import {noteService, userService} from "../services"
import NoteView from './components/NoteView.vue';
import AddNoteMenu from './components/AddNoteMenu.vue'
import HomeNavBar from './components/HomeNavBar.vue';


export default {
  components: { NoteView, AddNoteMenu, HomeNavBar },
    data () {
        return {
           user: {},
           notes: []
        }
    },
    created () {     
        this.getNotes()
        this.user = localStorage.getItem('user')   
        //userService.getAll().then(users => this.users = users);
    },

    methods: {
        createNew: function(e) {            
            noteService.createNew().then(note => 
            {
                this.getNotes();
            })
        },

        getNotes: function(){
            noteService.getByUserId().then(notes => this.notes = notes)
        },

        assignNotes: function(notes) {
            this.notes = notes
        }
    }
};
</script>

<style scoped>
    .notes-list{
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow: hidden;
    }

    .add-note{
        margin: 12px 10px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250px;
        height: 345px;
    }
</style>