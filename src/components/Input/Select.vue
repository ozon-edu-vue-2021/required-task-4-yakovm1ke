<template>
  <div
    class="input-item"
    v-click-outside="hideDropdown"
  >
    <label :for="id">
      {{ label }}
    </label>
    <input
      @focus="showDropdown"
      @input="onInputHandler"
      :id="id"
      :placeholder="placeholder"
      :value="value"
    />
    <div
      v-if="isDropdownOpen"
      class="dropdown"
    >
      <ul v-if="dropdownItems.length">
        <li
          v-for="dropdownItem in dropdownItems"
          :key="dropdownItem[dataKey]"
          @click="onDropdownClick(dropdownItem)"
        >
          {{ dropdownItem[dataValue] }}
        </li>
      </ul>
      <div
        v-else
        class="empty"
      >
        Ничего не найдено
      </div>
    </div>
  </div>
</template>


<script>
import ClickOutside from 'vue-click-outside';

export default {
    inheritAttrs: false,
    directives: {
      ClickOutside,
    },
    props: {
        id: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          default: '',
        },
        placeholder: {
          type: String,
          default: '',
        },
        label: {
          type: String,
          default: 'Empty label',
        },
        dropdownItems: {
          type: Array,
          default: () => [],
        },
        dataValue: {
          type: String,
          default: '',
        },
        dataKey: {
          type: String,
          default: '',
        }
    },
    data() {
        return {
          isDropdownOpen: false,
        }
    },
    methods: {
      onInputHandler(event) {
        event.target.value = this.value;
      },
      onDropdownClick(dropdownItem) {
        this.$emit('onDropdownClick', dropdownItem);
        this.hideDropdown();
      },
      hideDropdown() {
        this.isDropdownOpen = false;
      },
      showDropdown() {
        this.isDropdownOpen = true;
      },
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

.input-item input:hover {
  cursor: pointer;
}

.dropdown {
  color: #2c3e50;
  width: 100%;
  max-height: 200px;
  position: absolute;
  top: 65px;
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 2;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.dropdown::-webkit-scrollbar {
  width: 10px;
}

.dropdown::-webkit-scrollbar-thumb {
  background-color: #999999;
  border-radius: 5px;
}

.dropdown ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown li {
  padding: 10px;
  transition: 200ms;
}

.dropdown li:hover {
  background-color: #e8e8ff;
  cursor: pointer;
}

.empty {
  padding: 10px;
}
</style>