<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4">Send a Message to Server (MsgTx)</h1>

        <!-- 使用 Vuetify 的表單 -->
        <v-form ref="formRef" v-model="isFormValid" @submit.prevent="sendMessage">
          <!-- 訊息欄位 -->
          <v-text-field
            v-model="messageContent"
            label="Enter your message"
            :rules="[rules.required]"
            outlined
            required
          ></v-text-field>

          <!-- 年齡欄位 -->
          <v-text-field
            v-model.number="age"
            label="Enter your age"
            type="number"
            :rules="[rules.required, rules.positiveAge]"
            outlined
            required
          ></v-text-field>

          <!-- 提交按鈕 -->
          <v-btn :disabled="!isFormValid" type="submit" color="primary">Send Message</v-btn>
        </v-form>

        <!-- 顯示伺服器回應 -->
        <div v-if="response">
          <h2 class="text-h6">Server Response:</h2>
          <pre>{{ response }}</pre>
          <h2 class="text-h6">Updated Age:</h2>
          <pre>{{ updatedAge }}</pre>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

// 使用 runtimeConfig 獲取 API 基礎 URL
const config = useRuntimeConfig()

// 表單相關狀態和變數
const messageContent = ref('')
const age = ref(0)
const response = ref(null)
const updatedAge = ref(null)

// 表單驗證狀態
const isFormValid = ref(false)
const formRef = ref(null)

// 驗證規則
const rules = {
  required: value => !!value || 'This field is required',
  positiveAge: value => value > 0 || 'Age must be greater than 0'
}

// 發送訊息到伺服器
const sendMessage = async () => {
  if (formRef.value.validate()) {
    try {
      const res = await axios.post(`${config.public.apiBaseUrl}/message`, {
        Content: messageContent.value,
        Age: age.value
      })

      response.value = res.data.response
      updatedAge.value = res.data.age

      formRef.value.reset()
    } catch (error) {
      response.value = `Error: ${error.message}`
    }
  }
}
</script>
