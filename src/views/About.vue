<template>
    <div>
        <el-row class="container">
            <el-col :span="24" class="header">
              <el-col :span="10" class="logo" :class="collapsed? 'logo-collapse-width':'logo-width'">
                  {{collapsed?'':sysName}}
              </el-col>

              <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                  <i class="el-icon-s-fold"></i>
                </div>
              </el-col>

              <el-col :span="4" class="userInfo">
                  <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>我的消息</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
            </el-col>

            <el-col :span ="24" class="main">
                <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed" style="width: 230px">
                      <template v-for="(item,index) in $router.options.routes">
                         <el-submenu :index="index+''" :key="index" v-if="!item.leaf && !item.hidden">
                            <template slot="title">
                              <i :class="item.iconCls"></i>
                              <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="(child,index) in item.children" :key="index" :index ="child.path" > 
                                {{child.name}}
                            </el-menu-item>
                          </el-submenu>
                          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">
                            <i :class="item.iconCls"></i>{{item.children[0].name}}
                          </el-menu-item>
                      </template>
                    </el-menu>

                    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                      <li v-for="(item,index) in $router.options.routes" class="el-submenu item" :key="index">
                        <p v-if="!item.hidden" style="dispaly:inline-block">
                          <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
                              <li v-for="child in item.children"  :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                                <p v-if="!child.hidden"  style="dispaly:inline-block">{{child.name}}</p>
                              </li>
                            </ul>
                          </template>
                          <template v-else>
                            <li class="el-submenu">
                              <div class="el-submenu__title " style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                            </li>
                          </template>
                        </p>
                      </li>
                    </ul>
                </aside>


                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                      <el-col :span="24" class="breadcrumb-container">
                        <!-- <strong class="title">{{$route.name}}</strong> -->
                        <!-- <el-breadcrumb separator="/" class="breadcrumb-inner"> -->
                          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                            <!-- {{ item.name }} -->
                          </el-breadcrumb-item>
                        <!-- </el-breadcrumb> -->
                      </el-col>
                      <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                          <router-view></router-view>
                        </transition>
                      </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
   data() {
     return {
        collapsed: false,
        sysName: '黄',
        sysUserName: ''
     }
   },
   mounted(){
     var user = sessionStorage.getItem('user')
     if(user){
       this.sysUserName = JSON.parse(user)
     }
   },
   methods: {
     collapse() {
       this.collapsed = !this.collapsed
     },
     showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
		}
    
   }
}
</script>
<style scoped>
    .logo-collapse-width{
      width: 60px;
    }
    .logo-width{
      width: 230px
    }
    .container{
      position: absolute;
      top: 0px;
      bottom: 0px;
      width: 100%;
    }
    .header{
      height: 60px;
			line-height: 60px;
			background: #20a0ff;
			color:#fff;
    }
    .logo{
      height:60px;
      font-size: 22px;
      border-color: rgba(238,241,146,0.3);
      border-right-width: 1px;
      border-right-style: solid;
      text-align: center;
    }
    .tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
		}
    .userInfo{
        text-align: right;
				padding-right: 35px;
				float: right;
    }
    .userinfo-inner{
      cursor: pointer;
			color:#fff;
      font-size: 15px
    }
    .menu-collapsed{
      flex:0 0 60px;
      width: 60px;
    }
    .menu-expanded{
      flex:0 0 230px;
      width: 230px;
    }
    .main{
      display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
    }
    aside{
      flex: 0 0 230px;
      width: 230px
    }
    .el-menu{
      height: 100%;
    }
    .collapsed{
      width: 60px;
    }
    .item{
       position: relative;
    }
    .submenu{
      position:absolute;
      top:-5px;
      left:60px;
      z-index:99999;
      height:auto;
      display:none;
      background: #f3f3f3
    }
</style>