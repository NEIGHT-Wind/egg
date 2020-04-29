<template>
  <div
    class="introduce-warpper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">

    <div class="introduce-content">

      <div class="content-title">

        <div
          v-if="mainTitleShow"
          class="title-box"
          :style="mainTitleStyle">
          <p class="main-title">Photo, video, text saving tool</p>
          <p class="title-chinese">照片、视频、文本保存工具</p>
        </div>

        <div
          v-if="subTitleShow"
          class="title-box"
          :style="subTitleStyle">
          <p class="sub-title">Record every good thing in life</p>
          <p class="title-chinese">记录生活中每一份美好</p>
        </div>

      </div>

      <el-link
        v-if="linkShow"
        class="open-btn"
        :style="linkStyle"
        @click="linkTo">
        <span>Start the journey of recollection</span>
        <i class="el-icon-arrow-right"></i>
      </el-link>

    </div>

    <div
      class="introduce-mask"
      :style="maskOpacityStyle">
    </div>

    <div class="introduce-background"></div>

  </div>
</template>

<script>

export default {
  name: 'introduce',

  data() {
    return {
      maskOpacityStyle: {
        opacity: 0
      },

      mainTitleShow: false,
      mainTitleStyle: {
        opacity: 0
      },
      mainTitleTimer: null,

      subTitleShow: false,
      subTitleStyle: {
        opacity: 0
      },
      subTitleTimer: null,

      linkShow: false,
      linkStyle: {
        opacity: 0
      },
      linkTimer: null
    };
  },

  methods: {
    handleMouseEnter() {
      this.maskOpacityStyle.opacity = 0.5;
      this.mainTitleShow = true;
      this.subTitleShow = true;
      this.linkShow = true;

      this.mainTitleTimer = setTimeout(() => {
        this.mainTitleStyle.opacity = 1;
      }, 500);

      this.subTitleTimer = setTimeout(() => {
        this.subTitleStyle.opacity = 1;
      }, 1000);

      this.linkTimer = setTimeout(() => {
        this.linkStyle.opacity = 1;
      }, 1500);
    },

    handleMouseLeave() {
      clearTimeout(this.mainTitleTimer);
      clearTimeout(this.subTitleTimer);
      clearTimeout(this.linkTimer);

      this.mainTitleShow = false;
      this.subTitleShow = false;
      this.linkShow = false;

      this.mainTitleStyle.opacity = 0;
      this.subTitleStyle.opacity = 0;
      this.linkStyle.opacity = 0;

      this.maskOpacityStyle.opacity = 0;
    },

    linkTo() {
      this.$router.push({ name: 'photoIntroduce' })
    }
  }
}

</script>

<style scoped>

.introduce-warpper{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.introduce-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-image: url('../../assets/img/introduce.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.8;
  z-index: 0;
}

.introduce-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  opacity: 0;
  background-color: rgba(0, 0, 0);
  transition: opacity 0.5s;
  z-index: 1;
}

.introduce-content{
  flex: 1;
  height: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
}

.content-title{
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}

.title-box{
  transition: opacity 0.5s;
}

.content-title p{
  text-align: center;
}

.main-title{
  font-size: 28px;
}

.sub-title{
  font-size: 22px;
}

.title-chinese{
  margin-top: 15px;
  font-size: 14px;
}

.open-btn{
  font-size: 18px;
  color: #fff;
  transition: opacity 0.5s;
}

.open-btn span{
  margin-right: 5px;
}

.open-btn:hover{
  color: #409EFF;
}

</style>