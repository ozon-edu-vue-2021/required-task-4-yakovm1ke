<template>
    <div class="radio-input-container">
        <div
            class="radio-input-item"
            v-for="propValue in values"
            :key="propValue.id"
        >
            <input
                type="radio"
                :name="name"
                :id="propValue.id"
                :value="propValue.value"
                :checked="propValue.value === value"
                @change="onChangeHandler"
                v-bind="$attrs"
            />
            <label :for="propValue.id">
                {{ propValue.value }}
            </label>
        </div>
    </div>
</template>


<script>
export default {
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: '',
        },
        values: {
            type: Array,
            default: () => [],
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
        onChangeHandler(event) {
            this.$emit('input', event.target.value);
        }
    },
}
</script>

<style scoped>
.radio-input-container {
  display: flex;
  gap: 20px;
}

.radio-input-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-input-item input {
  width: 20px;
}

.radio-input-item:hover,
.radio-input-item input:hover,
.radio-input-item label:hover {
  cursor: pointer;
}
</style>