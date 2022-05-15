<template>
    <div class="nav-bar">
        <div class="search-bar">
            <input @input.prevent="search()" type="text" class="input-search" placeholder="Search" v-model="searchValue">
        </div>
        <div class="logout-label">
            <router-link to="/login">Logout</router-link>
        </div>
    </div>
</template>

<script>

import {noteService} from "../../services"
export default {
    data() {
        return {
            searchValue: ""
        }
    }, 
    methods: {
        search: function() {
            noteService.search(this.searchValue).then(notes => {
                this.$emit('assignNotes', notes);
            })
        }
    }
}
</script>

<style scoped>
    .nav-bar{
        background-color: rgb(94, 190, 142);
        width: 100%;
        height: 50px;
        position: relative;
    }

    .search-bar{
        position: absolute;
        width: 300px;
       
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .logout-label {
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translate(0%, -50%);    
    }

    .input-search{
        width: 100%;
        height: 26px;
        border: 0;

        padding-left: 10px;
       
        border-radius: 5px;
    }

    .input-search:active {
        outline: 2px solid rgb(94, 190, 142);
    }

    .input-search::placeholder{
        font-style: italic;
    }
</style>
