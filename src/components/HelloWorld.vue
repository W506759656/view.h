<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button type="primary" @click="test">Primary</Button>
    <Button type="primary" @click="logout">Logout</Button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
      test(){
          axios.get(this.URL_PREFIX+'/index',{
          }).then(({status,data})=>{
              this.msg = data;
          });
      },
      logout(){
          axios.post(this.URL_PREFIX+'/auth/logout', {}).then(respond => {
              location.href = 'auth/login';
          })
          this.$store.dispatch('logout')
      }
  },
  mounted(){
      axios.get(this.URL_PREFIX+'/getAuthenticatedUser', {}).then(respond => {
          if (respond.status == 200) {
              console.log(respond.data);
          } else {
          }
      })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
