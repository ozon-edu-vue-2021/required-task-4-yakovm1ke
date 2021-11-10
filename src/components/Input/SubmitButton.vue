<template>
    <div class="submit-button-container">
      <button class="form-item submit-button">
        Отправить форму
      </button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.submit-button-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button {
  width: 30%;
  padding: 20px;
  background-color: #216BFF;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 200ms;
}

.submit-button:hover {
  cursor: pointer;
  filter: brightness(0.9);
}
</style>