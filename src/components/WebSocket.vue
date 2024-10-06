<template>
  <div class="websocket-container">
    <div class="messages">
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div class="send-message">
      <n-input v-model="newMessage" placeholder="Type a message" />
      <n-button @click="sendMessage">Send</n-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      messages: [],
      newMessage: '',
    };
  },
  created() {
    this.connect();
  },
  methods: {
    connect() {
      this.ws = new WebSocket('ws://192.168.3.23:8100/ws/point');

      this.ws.onopen = () => {
        this.messages.push('Connected to the server');
      };

      this.ws.onmessage = (event) => {
        this.messages.push(event.data);
      };

      this.ws.onclose = () => {
        this.messages.push('Disconnected from the server');
        // Reconnect
        setTimeout(() => {
          this.connect();
        }, 1000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    },
    sendMessage() {
      if (this.newMessage !== '') {
        this.ws.send(this.newMessage);
        this.newMessage = ''; // clear input after sending
      }
    },
  },
};
</script>

<style scoped>
.websocket-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.messages {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  height: 200px;
  overflow-y: auto;
  width: 100%;
}

.send-message {
  display: flex;
  width: 100%;
}

.send-message input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
}

.send-message button {
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
}

.send-message button:hover {
  background-color: #0056b3;
}
</style>
