<template>
  <div class="container">
    <el-row justify="space-around">
      <el-col :span="9" :xs="24">
        <el-card>
          <template #header>
            <h3>{{ $translate(`${$route.params.lang}.auth.register_form.title`) }}</h3>
          </template>

          <el-form v-model="form" @submit.prevent="user.register(form)" label-width="160px">

            <el-form-item :label="$translate(`${$route.params.lang}.auth.register_form.name`)">
              <el-input v-model="form.name"/>
            </el-form-item>

            <el-form-item :label="$translate(`${$route.params.lang}.auth.register_form.email`)">
              <el-input v-model="form.email"/>
            </el-form-item>

            <el-form-item :label="$translate(`${$route.params.lang}.auth.register_form.password`)">
              <el-input type="password" v-model="form.password" show-password/>
            </el-form-item>

            <el-form-item :label="$translate(`${$route.params.lang}.auth.register_form.password_confirmation`)">
              <el-input type="password" v-model="form.password_confirmation" show-password/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="user.register(form)">
                {{ $translate(`${$route.params.lang}.auth.register_form.submit`) }}
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
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      user: useAuthStore()
    }
  }
}
</script>