<template>
    <div class="form">    
        <div class="form-group">
            <h2>Login</h2>
        </div>    
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="button sumbit-btn" :disabled="loading">Login</button>
                <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
    </div>
</template>

<script>
import { router } from '../helpers';
import { userService } from '../services';

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            returnUrl: '',
            error: ''
        }
    },
    created () {        
        userService.logout();
        
        this.returnUrl = this.$route.query.returnUrl || '/';
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;

           
            if (!(username && password)) {
                return;
            }

            this.loading = true;
            userService.login(username, password)
                .then(
                    user => router.push(this.returnUrl),
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }
};
</script>

<style scoped>
    body{
        width: 100%;
        height: 100%;
        
        position: relative;
    }
    .form{
        width: 500px; 
        margin: 0 auto;  
        background-color: rgb(240, 240, 240);
        border: 2px solid rgb(94, 190, 142);
        border-radius: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .form-group{
        margin: 10px auto;
        padding: 5px;
        width: fit-content;

    }
    h2{
        padding: 10px;
        width: fit-content;
        margin: 0 auto;
    }
    label {
        padding: 10px;        
    }
    .invalid-feedback{
        margin: 10px auto;
        color: rgb(204, 74, 74);
        width: fit-content;
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

    .sumbit-btn{
         border: 2px solid rgb(94, 190, 142);
        border-radius: 7px;

        background-color: rgb(94, 190, 142);
    }

    .sumbit-btn:hover{
          color: rgb(94, 190, 142);
        background-color: rgb(240, 240, 240);
    }

</style>
