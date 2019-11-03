<template>
  <div class="hello">
    <button class="myButton " @click="sort(); sorting = !sorting">Sort</button>
    &nbsp;
    <button class="myButton " @click="reset()">Reset</button>
  <br>

  <div class="card" v-if="showData">
    <div class="square"></div>
    <div class="skeleton"></div>
  </div>
  <div class="card"
  v-bind:class="item.dob.age <= 17 ? 'red' : item.dob.age <= 30 ? 'green' : 'blue'"
  v-for="item in showList"
  :key=item.id.value>
      <div class="square"></div>
      <div class="inline">
        <span> {{item.name.first}} {{item.name.last}} ,  {{item.dob.age}}</span>
          <br>
          <span class="postal">
            {{item.location.city}}  {{item.location.state}}, {{item.location.postcode}}
          </span>
      </div>
  </div>
  <button class="myButton " @click="load" v-show="show">Load More</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      listArray: [],
      showList: [],
      slice: 1,
      show: false,
      sorting: false,
      showData: true,
    }
  },
  created () {
    var sliceList
    if (localStorage.list) {
      const list = JSON.parse(localStorage.list)
      this.listArray = list
      sliceList = localStorage.slice
      this.showList = list.slice(0, sliceList * 10) 
      this.show = sliceList < 10 ? true : false
      this.showData = false
    }else if (this.$store.getters.list.length > 0) {
      const list = this.$store.getters.list
      sliceList = this.$store.getters.arrayList
      this.showList = list.slice(0, sliceList * 10)
    } else {
      this.getData()
    }
  },
  methods:{
    getData() {
      axios.get('https://randomuser.me/api/?results=100')
        .then(data=> {
          this.showData = false
          const item = data.data.results
          this.listArray = item
          this.show = true
          localStorage.setItem('list', JSON.stringify(item))
          localStorage.setItem('slice', 1)
          this.$store.commit('changeList', item)
          this.$store.commit('changeArrayList', 1)
          this.showList = item.slice(0, 10)
        })
    },
    load () {
      this.slice++
      if(this.slice <= 10) {
        this.$store.commit('changeArrayList', this.slice)
        localStorage.setItem('slice', this.slice)
        this.showList = this.listArray.slice(0, this.slice * 10)
      } else {
        this.show = false
      }
    },
    sort () {
      if (this.sorting == false) {
        this.$store.commit('changeSort', this.sorting)
        this.showList.sort(function(a,b) {
          if(a.location.city < b.location.city) { return -1; }
          if(a.location.city > b.location.city) { return 1; }
          return 0;
        })
      } else {
        this.$store.commit('changeSort', this.sorting)
        this.showList.sort(function(a,b) {
          if(a.location.city > b.location.city) { return -1; }
          if(a.location.city < b.location.city) { return 1; }
          return 0;
        })
      }
    },
    reset () {
      localStorage.clear();
      this.showList = []
      this.showData = true
      this.getData()
    }
  }
}
</script>

<style scoped>
.hello{
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
}

.myButton {
	box-shadow:inset 0px 1px 3px 0px #91b8b3;
	background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
	background-color:#768d87;
	border-radius:5px;
	border:1px solid #566963;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:11px 23px;
	text-decoration:none;
	text-shadow:0px -1px 0px #2b665e;
  margin-bottom: 10px;
}
.myButton:hover {
	background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
	background-color:#6c7c7c;
}
.myButton:active {
	position:relative;
	top:1px;
}


.card{
  position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    margin-bottom: 10px;
}

.square {
  height: 50px;
  width: 50px;
  background-color: #555;
}

.inline{
  padding-left: 5px;
  text-align: left;
}

.red{
  background-color: #e53935;
  color: #fff;
}

.blue{
  background-color: #0d47a1;
  color:#fff;
}

.green{
 background-color:  #4caf50;
}

	.skeleton:empty {
    margin: auto;
		width: 500px;
		height: 60px;
    
		background-image:
			linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),
			linear-gradient( lightgray 20px, transparent 0 ),
			linear-gradient( lightgray 20px, transparent 0 );

		background-repeat: repeat-y;

		background-size:
			50px 200px,
			150px 200px,
			350px 200px;

		background-position:
			0 0,
			10px 0,
			10px 30px;

		animation: shine 1s infinite;
	}

	@keyframes shine {
		to {
			background-position:
				100% 0,
				10px 0,
				10px 30px;
		}
	}
</style>
