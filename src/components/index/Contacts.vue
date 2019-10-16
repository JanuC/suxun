<template>
  <div class="main">
    <div class="search">
     <el-input v-model="inputVal" placeholder="请输入搜索联系人" @input="searchList(inputVal)" suffix-icon="fa fa-search"></el-input>
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
            <h1 v-show="inputShow(index)">{{item.name}}</h1>
            <input type="text" class="name" v-model="item.name" v-show="!inputShow(index)">
            <p  v-show="inputShow(index)">{{item.tel}} </p>
            <input type="text" class="name" v-model="item.tel" v-show="!inputShow(index)">
            <i class="fa fa-pencil-square-o" aria-hidden="true" @click="clickUpdate(index)" v-show="inputShow(index)"></i>
            <i class="fa fa-check" aria-hidden="true" v-show="!inputShow(index)"  @click="updateData(index)"></i>
            <i class="fa fa-trash" aria-hidden="true" v-show="inputShow(index)" @click="delData(index)"></i> 
            <i class="fa fa-times" aria-hidden="true" v-show="!inputShow(index)" @click="giveUp"></i>
          </div>
        </li>
      </ul>
      <div class="noPerson" v-else>
        <h1>没有联系人</h1>
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
      sArr: [], //存放匹配到的搜索项的索引
      clickIndex: -1, // 控制点击修改按钮时,自己改变,其余不变
      clickObj: {},// 用于存放点击修改时,对应的原信息 
      oldVal: '',// 保存修改前的信息
      newVal: '',// 保存修改后的信息
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
  updated() {
    if(this.list.length === 0) {
      this.isShow = false
    }
  },
  methods: {
    // 点击 分类
    selectMsg(data) {
      this.selMsg = data
    },
    // 点击修改按钮
    clickUpdate(index) {
      this.clickIndex = index
      // 将当前list转换为JSON字符串并保存
      this.oldVal = JSON.stringify(this.list)
    },
    // 确认修改信息
    updateData(index) {
      this.clickIndex = -1
      // 将修改后的list 转换为JSON字符串
      this.newVal = JSON.stringify(this.list)
      // 比较两个字符串是否完全相等
      if(this.oldVal === this.newVal) {
        // console.log(1);
        // 相等,说明用户并没有修改
        return
      }else {
        // console.log(2);
        // 不相等,说明用户做了修改,发送请求更新数据
        // console.log(id);
        // 先去拿对应表名
        const tName = localStorage.getItem('tableName')
        const obj = this.list[index]
        obj.tName = tName
        
        Axios
        .post('http://192.168.31.19:3001/myapi/update',obj)
        .then(res => {
          if(res.data.err_code === 200) {
            // 操作成功
            return
            
          }else {
            // 操作失败
            // 将数据改回发送请求前
            this.list = JSON.parse(this.oldVal)
          }
          
        })
      }
    },
    // 放弃修改
    giveUp() {
      this.clickIndex = -1
    },
    // 删除功能
    delData(index) {
      const tName = localStorage.getItem('tableName')
      const obj = {
        tName: tName,
        id: this.list[index].id
      }
      Axios
        .post('http://192.168.31.19:3001/myapi/del',obj)
        .then(res => {
         if(res.data.err_code === 200) {
           // 删除成功
           this.list = res.data.list
         }else {
           console.log('操作失败');
           
         }
          
        })
    }
  },
  computed: {
    // 点击分类时,显示对应的信息
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
    // input搜索时,显示对应
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
    },
    // 点击修改时,input显示
    inputShow() {
      return (index) => {
        return index != this.clickIndex
      } 
    },
    // // 因为数据同源,深度监听只能监听到值的变化,并不能得到不同的值
    // // 需要和computed结合使用
    // changeVal() {
    //   // 由于计算属性会存在缓存中,计算引用数据类型时,数据内容改变
    //   // 但地址没变,不会触发watch
    //   // 将数据转换为JSON字符串,再监听
    //   return JSON.stringify(this.list)
    // }
  }


}
</script>

<style lang="less" scoped>
  @import '../../assets/css/contacts.less';
</style>

