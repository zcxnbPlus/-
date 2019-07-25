/*
*    属性名      值类型        默认值         说明
*    type      String        breath       breath=呼吸轮播图、slide=滚动轮播图
*    width     String        100%         轮播图的宽
*    height    String        300px        轮播图的高
*    img       Array         无，必填      图片数组，成员值为地址
*    time      Number        3000         轮播图的切换间隔
*    duration  Number        1000         过度时间,单位ms
*/



<template>  
  <div class="swiper">
      <div class="container" >
         <!-- 呼吸图 -->
        <div v-if="type === 'breath'">
          <img  :class=" index === 0 ? 'active breath-img' : 'breath-img' " :src="item" alt="课程图" v-for="(item, index) in this.$props.img" :key="index" >
        </div>
       

        <!-- 滚动轮播图 -->
          <ul v-if="type === 'slide'">
              <li v-for="(item, index) in this.$props.img" :key="index"><img class="slide-img" :src="item" alt="课程图"></li>
          </ul>

      </div>
      <div class="circles">
            <span  :class=" index === 0 ? 'active circle' : 'circle'" v-for="(item, index) in (type === 'breath' ? this.$props.img : this.$props.img.length - 1)" :key="index"></span>
      </div>
  </div>
</template>

<style lang="less" scoped>
    .swiper {
        background-color: #fff;
        position: relative;
        .container {
          overflow: hidden;
          width: 100%;
          height: 100%;
            .breath-img {
              transition-duration: 1000ms;
              position:absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
              &.active {
                opacity: 1;
              }
            }
            ul {
              position: relative;
              transition: 1s;
              left: 0px;
              li {
                display: inline-block;
              }
            }
        }
        .circles {
          position: absolute;
          width: 100%;
          bottom: 0;
          display: flex;
          justify-content: center;
          height: 10%;
          .circle {
            margin-right: 5px;;
            display: inline-block;
            background-color: #ccc;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              border: 1px solid #fff;
              &.active {
                  background-color: #fff;
              }
          }
        }
    }
</style>

<script>
export default {
  data() {
    return {
        timebar : null,
        index : 0,
        // 组件初始化标志
        initial : true,
    }
  },
  // 接受轮播图设置的属性
  props:{
    // 轮播图类型
    type:{
      type:String,
      default:'breath'
    },
    // 时间
    time:{
      type:Number,
      default:3000
    },
    // 图片
    img:{
      type:Array,
      required:true
    },
    // 宽高
    width:{
      type:String,
      default:'100%'
    },
    height:{
      type:String,
      default:'300px'
    },
    // 过度时间
    duration:{
      type:Number,
      default:1000
    }
  },
    mounted() {
      //  设置轮播图宽高

      // 根据组件接收到的数据设置相应的属性
      
      if(this.initial){
        if(this.$props.type === 'breath') {
        this.breathSitting()
      }else if(this.$props.type === 'slide') {
        this.slideSitting ()
      }else {
        throw Error('the prop of "type" must be "breath" or "slide" ');
      }
      }
      // 初始化完毕后把标志设为false
      this.initial = false;
    },
    created() {
      // 如果是滑动模式。复制一张图到末尾
      if(this.$props.type === 'slide'){
        this.$props.img.push(this.$props.img[0])
      }
      
       // 启动轮播图定时器
      if(this.$props.type === 'breath') {
        this.timebar = setInterval( () => { this.breathChange(1) },this.$props.time)
      }else if(this.$props.type === 'slide') {
         this.timebar = setInterval( () => { this.slideChange(1) },this.$props.time)
      }
    },
    methods:{
      // 呼吸轮播图切换方法
      breathChange(i) {
        // 参数i用于后续添加点击切换使用 后退设置为-1
          // 定义信号量
              let num = this.index % this.$props.img.length;
              // 当前信号量的图片&小圆点退出
              this.$el.children[0].children[0].children[num].classList.remove('active');
              this.$el.children[1].children[num].classList.remove('active');

              // 改变信号量
              this.index+=i;
              num = this.index % this.$props.img.length;

              // 改变后的信号量的图片&小圆点进入
              this.$el.children[0].children[0].children[num].classList.add('active');
              this.$el.children[1].children[num].classList.add('active');
      },
      // 呼吸轮播图初始化方法
      breathSitting() {
        this.$el.style.width = this.$props.width;
        this.$el.style.height = this.$props.height;

        // 设置图片的样式:宽、高、过度时间
        Array.from(this.$el.children[0].children[0].children).map( item => {
        item.style.width = this.$props.width;
        item.style.height = this.$props.height;
        item.style.transitionDuration = this.duration + "ms";
        })
      },
      // 滚动轮播图初始化方法
      slideSitting() {
                  //设置swiper的样式
          this.$el.style.width = this.$props.width;
          this.$el.style.height = this.$props.height;
          // 定义图片宽度及滑动步长
          let width = window.getComputedStyle(this.$el).width

          //设置图片父元素ul的长度
          this.$el.children[0].children[0].style.width = this.$props.img.length * parseFloat(width) + 'px';
          // 设置ul的过度时间
          this.$el.children[0].children[0].style.transitionDuration = this.duration;
          // 设置图片的样式
          Array.from(this.$el.children[0].children[0].children).map( item => {
          item.children[0].style.width = width;
          item.children[0].style.height = this.$props.height;
      })
    },
    // 滚动轮播图切换方法
    slideChange(i) {
        // 参数i用于后续添加点击切换使用 后退设置为-1
              // 定义滚动的宽度
              let width = -parseFloat(window.getComputedStyle(this.$el).width);
              // 定义图片切换信号量
              let num = 0;
              // 上一个小圆点退出
              this.$el.children[1].children[num].classList.remove('active');
              // 改变信号量
              this.index+=i;
              num = this.index % this.$props.img.length;
              //移动图片
              this.$el.children[0].children[0].style.left = width * num + 'px';
              // 切换小圆点
              if(num  === this.$props.img.length - 1){
              this.$el.children[1].children[num - 1].classList.remove('active');
              this.$el.children[1].children[0].classList.add('active');

              } else{
              this.$el.children[1].children[num].classList.add('active');
              }
              // 当滑动到最后一张时，等到滑动结束，改变过度时间，并滑动到第一张，滑动后再复原过度时间
              if(num === this.$props.img.length - 1) {
                setTimeout( () => {
                  // console.log(this.$el.children[0].children[0].style)
                    this.$el.children[0].children[0].style.transitionDuration = '0s';
                    this.slideChange(1);
                     setTimeout( () => {
                      this.$el.children[0].children[0].style.transitionDuration = this.duration + "ms";
                    },500)
                },1100)
              }

    }
  }
}
</script>
