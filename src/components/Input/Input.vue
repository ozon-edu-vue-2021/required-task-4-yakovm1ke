<template>
    <div class="input-item">
        <label :for="id">
            {{ label }}
        </label>
        <input
            :type="type"
            :id="id"
            :value="value"
            @input="onInputHandler"
            v-bind="$attrs"
        />
    </div>
</template>


<script>
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'text',
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: 'Empty label'
        },
        value: {
            type: String,
            default: '',
        }

    },
    data() {
        return {

        }
    },
    methods: {
        onInputHandler(event) {
            this.$emit('input', event.target.value);
        }
    },
}
</script>

<style scoped>
.input-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #999999;
  position: relative;
}

.input-item input {
  margin: 10px 0 0;
  padding: 5px;
  border: solid 2px #999999;
  border-radius: 5px;
  color: #2c3e50;
  font-family: inherit;
  transition: 200ms;
}

.input-item input:focus {
  outline: none;
  border-color: #216BFF;
}

.input-item input::placeholder {
  color: #999999;
}

.input-item label span{
  color: #2c3e50;  
}

.input-item input:required:focus:invalid {
  border-color: red;  
}

.input-item input:required:focus:valid {
  border-color: green;  
}

</style>