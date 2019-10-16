<template>
  <div class="main">
    <div class="search">
     <el-input v-model="inputVal" placeholder="请输入搜索联系人" @input="searchList(inputVal)"></el-input>
    </div>
    <p class="all">共{{ list.length }}个联系人</p>
    <div class="select">
      <input type="radio" name="contact" @click="selectMsg('all')" checked>所有联系人
      <input type="radio" name="contact" @click="selectMsg('family')">亲人
      <input type="radio" name="contact" @click="selectMsg('friend')">朋友
      <input type="radio" name="contact" @click="selectMsg('colleague')">同事
    </div>
    <div class="ul">
      <ul v-if="isShow">
        <li v-for="(item,index) in list" :key="index" v-show="renList(item,index)">
          <img src="../../../static/img/logo.png">
          <div class="msg">
            <h1>{{item.name}}</h1>
            <p>{{item.tel}}</p>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <i class="fa fa-trash" aria-hidden="true"></i> 
          </div>
        </li>
      </ul>
      <div class="noPerson" v-else>
        <h1>该联系人不存在</h1>
      </div>
    </div>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      inputVal: '',// input 中的值
      selMsg: 'all',// select 选中时的值
      list: [],// 后台返回的数据
      isShow: true,// 根据检索到搜索框中信息控制 ul 显示与隐藏
      sArr: [] //存放匹配到的搜索项的索引
    }
  },
  created() {
    // 获取存在localStorage中的tableName
    const tName = localStorage.getItem('tableName')
    // 一进入页面,发送请求,获取用户对应信息
    Axios
    .post('http://192.168.31.19:3001/myapi/contacts',{tName: tName})
    .then((res) => {
      // console.log(res);
      this.list = res.data.data
      
    })
  },
  methods: {
    
    // renderList(data) {
    //   // 先去拿完整的数组
    //   let newArr = []
    //   this.list.forEach(item=> {
    //     newArr.push(item)
    //   })
    //   // 再操作拿到的数组
    //   if(data === 'all') {
    //     this.rList = newArr
    //   }else {
    //     this.rList = newArr.filter(item => {
    //     return item.lable === data
    //     })
    //   }
    // } 
    selectMsg(data) {
      this.selMsg = data
    },
     
  },
  computed: {
    renList() {
      // computed中不能直接传参,利用闭包进行传参
      return (item,index) => {
        // 如果 input 没有值时
        if(this.inputVal === '') {
          // 且 选中全部联系人
          if(this.selMsg === 'all') {
          return true
        }else{
          // 切换lable时
          return item.lable === this.selMsg
          }
        }else {
          // input 中有值
          // 没有查询到对应信息
          if(this.sArr.length === 0) {
            console.log('不存在该联系人');
            
          }else {
            // 查询到了对应信息
            for( var i in this.sArr) {
             if(this.sArr[i] === index) {
               return true
             }
            }
          }
        }
        
      }
    },
    searchList() {
      return (data)=> {
        // 将isShow置为true,让 ul 显示
        this.isShow = true
        if(data === '') {
        }else {
          let arr = []
        this.list.map((item,index) => {
          if(
            item.name.search(data) != -1) {
              // 说明有匹配的
              arr.push(index)
          }
        })
        if(arr.length === 0) {
          // 说明没有匹配到
          this.isShow = false
        }else {
          // 匹配到了
          this.sArr = arr;
        }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/contacts.less';
</style>

