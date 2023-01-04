<template>
  <el-container>
    <el-header class="header">
      <el-row justify="space-between" class="w-100">
        <el-col :xs="24" :span="6" class="max-content">
          <router-link :to="'/'+$route.params.lang" style="color: black">
            Covid19 statistic app
          </router-link>
        </el-col>

        <el-col :xs="24" :span="6" class="max-content" >
          <el-row :gutter="20">


            <el-col class="max-content">
              <router-link to="/ka">ქართული</router-link>
            </el-col>

            <el-col class="max-content">
              <router-link to="/en">English</router-link>
            </el-col>

            <el-divider direction="vertical" style="height: 23px"/>

            <template v-if="auth.user">
              <el-col class="max-content">
                {{ auth.user.name }}
              </el-col>

              <el-col class="max-content">
                <el-button type="primary" link @click="auth.logout">{{ $translate(`${$route.params.lang}.auth.logout`) }}</el-button>
              </el-col>
            </template>

            <template v-else>
              <el-col class="max-content">
                <router-link :to="'/'+$route.params.lang+'/login'">
                  {{ $translate(`${$route.params.lang}.auth.login`) }}
                </router-link>
              </el-col>
              <el-col class="max-content">
                <router-link :to="'/'+$route.params.lang+'/register'">
                  {{ $translate(`${$route.params.lang}.auth.register`) }}
                </router-link>
              </el-col>
            </template>

          </el-row>
        </el-col>

      </el-row>

    </el-header>
    <el-main :class="$route.name === 'home' ? '' : 'center'">
      <router-view/>
    </el-main>
  </el-container>

</template>

<script lang="ts">
import {useAuthStore} from "@/stores/auth";

export default {
  data(){
    return {
      auth: useAuthStore()
    }
  },
  created() {
    useAuthStore().fetchUser();
  },
}
</script>
