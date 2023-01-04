<template>
  <div class="container">
    <el-row justify="space-around">
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>
            <h3>
              {{ $translate(`${$route.params.lang}.auth.login_form.title`) }}
            </h3>
          </template>

          <el-form v-model="form" @submit.prevent="auth.login(form)" label-width="100px">
            <el-form-item :label="$translate(`${$route.params.lang}.auth.login_form.email`)">
              <el-input v-model="form.email"/>
            </el-form-item>

            <el-form-item :label="$translate(`${$route.params.lang}.auth.login_form.password`)">
              <el-input type="password" v-model="form.password" show-password/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="auth.login(form)">
                {{ $translate(`${$route.params.lang}.auth.login_form.submit`) }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth";

export default {
  data(){
    return {
      form: {
        email: null,
        password: null,
      },
      auth: useAuthStore()
    }
  },
  methods: {

  }
}
</script>