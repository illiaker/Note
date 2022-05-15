
<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');


html, body {
    font-family: "Radio-Canada";
   
}


</style>