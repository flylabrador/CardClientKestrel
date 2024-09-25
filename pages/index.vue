<template>
  <div>
    <h1>Send a Message to Server Homepage</h1>

    <!-- 簡單的輸入表單 -->
    <form @submit.prevent="sendMessage">
      <!-- 訊息欄位 -->
      <input
        v-model="messageContent"
        type="text"
        placeholder="Enter your message"
        required
      />
      <!-- 年齡欄位 -->
      <input
        v-model.number="age"
        type="number"
        placeholder="Enter your age"
        required
      />
      <button type="submit">Send Message</button>
    </form>

    <!-- 顯示伺服器回應 -->
    <div v-if="response">
      <h2>Server Response:</h2>
      <pre>{{ response }}</pre>
      <h2>Updated Age:</h2>
      <pre>{{ updatedAge }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 定義 message 內容和伺服器的回應
const messageContent = ref('')
const age = ref(0)  // 年齡欄位，默認值為 0
const response = ref(null)
const updatedAge = ref(null)  // 儲存伺服器回傳的更新年齡

// 發送訊息到伺服器
const sendMessage = async () => {
  try {
    const res = await axios.post('https://localhost:5000/api/message', {
      Content: messageContent.value,  // 傳送訊息到伺服器
      Age: age.value,  // 傳送年齡到伺服器
    })

    // 取得並顯示伺服器的回應
    response.value = res.data.response  // 儲存伺服器回應訊息
    updatedAge.value = res.data.age  // 儲存伺服器回應的年齡
  } catch (error) {
    response.value = `Error: ${error.message}`
  }
}
</script>
