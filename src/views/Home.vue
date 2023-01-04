<template>
  <el-table :data="filtered_data">
    <el-table-column>
      <template #header>
        {{ $translate(`${$route.params.lang}.home.name`) }}
        <el-input v-model="search.name" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.name`)" style="width: 200px"/>
      </template>
      <template #default="scope">
        {{ scope.row.name[$route.params.lang] }}
      </template>
    </el-table-column>

    <el-table-column sortable  prop="confirmed">
      <template #header>
        {{ $translate(`${$route.params.lang}.home.confirmed`) }}
        <el-input @click.prevent="" v-model="search.confirmed.from" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.from`)" style="width: 80px"/>
        <el-input @click.prevent="" v-model="search.confirmed.to" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.to`)" style="width: 80px"/>
      </template>
    </el-table-column>
    <el-table-column sortable prop="recovered">
      <template #header>
        {{ $translate(`${$route.params.lang}.home.recovered`) }}
        <el-input @click.prevent="" v-model="search.recovered.from" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.from`)" style="width: 80px"/>
        <el-input @click.prevent="" v-model="search.recovered.to" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.to`)" style="width: 80px"/>
      </template>
    </el-table-column>
    <el-table-column sortable prop="death">
      <template #header>
        {{ $translate(`${$route.params.lang}.home.death`) }}
        <el-input @click.prevent="" v-model="search.death.from" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.from`)" style="width: 80px"/>
        <el-input @click.prevent="" v-model="search.death.to" size="small" :placeholder="$translate(`${$route.params.lang}.home.search.to`)" style="width: 80px"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      data: null,
      search: {
        name: null,
        confirmed: {
          from: null,
          to: null,
        },
        recovered: {
          from: null,
          to: null,
        },
        death: {
          from: null,
          to: null,
        },
      }
    }
  },
  computed: {
    filtered_data(){
      if (!this.data)
        return null;

      return this.data.filter(country =>
          (
            !this.search.name ||
            country.name.ka.toLowerCase().includes(this.search.name.toLowerCase()) ||
            country.name.en.toLowerCase().includes(this.search.name.toLowerCase())
          ) && // by name
          (
              !this.search.confirmed.from ||
              country.confirmed >= this.search.confirmed.from
          ) &&// confirmed from
          (
              !this.search.confirmed.to ||
              country.confirmed <= this.search.confirmed.to
          ) && // confirmed to
          (
              !this.search.recovered.from ||
              country.recovered >= this.search.recovered.from
          ) &&// confirmed from
          (
              !this.search.recovered.to ||
              country.recovered <= this.search.recovered.to
          ) && // recovered to
          (
              !this.search.death.from ||
              country.death >= this.search.death.from
          ) &&// death from
          (
              !this.search.death.to ||
              country.death <= this.search.death.to
          ) // death to
      )
    }
  },
  watch: {
    data(newVal){
      axios.get('/api/countries/statistics')
          .then(response => {
            response.data.forEach(statistic => {
              Object.assign(
                  this.data.find(country => country.id === statistic.country_id),
                  statistic
              )
            })
          });
    }
  },
  created() {
    axios.get('/api/countries')
        .then(response => this.data = response.data)
  }
}
</script>