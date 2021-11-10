<template>
  <form
    autocomplete="off"
    class="form"
    @submit.prevent="onSubmit()"
  >
    <div class="personal-info">
      <h2>Личные данные</h2>

      <div class="form-item fullname-container">
        <Input
          type="text"
          id="last-name"
          label="Фамилия"
          v-model="formData.lastName"
          placeholder="Иванов"
          required
          pattern="([А-ЯЁа-яё])+"
        />

        <Input
          type="text"
          id="first-name"
          label="Имя"
          v-model="formData.firstName"
          required
          placeholder="Иван"
          pattern="([А-ЯЁа-яё])+"
        />

        <Input
          type="text"
          id="patronymic"
          label="Отчество"
          v-model="formData.patronymic"
          required
          placeholder="Иванович"
          pattern="([А-ЯЁа-яё])+"
        />

      </div>

      <div class="form-item-comment">
        Введите ФИО на русском языке
      </div>

      <div class="form-item birthday-container">
        <Input
          type="date"
          id="birthday"
          label="Дата рождения"
          v-model="formData.birthday"
          required
          :max="todayDate"
        />
      </div>

      <div class="form-item-comment">
        Укажите дату не позднее сегодняшнего числа
      </div>

      <div class="form-item email-container">
        <Input
          type="text"
          id="email"
          label="E-mail"
          v-model="formData.email"
          pattern="(\w)+@(\w)+\.([A-Za-z])+"
          required
          placeholder="example@example.com"
        />
      </div>
      
      <div class="form-item gender-container">
        <h3>Пол</h3>

        <RadioInput 
          name="gender"
          :values="genderRadio"
          v-model="formData.gender"
        />

      </div>
    </div>

    <div class="passport-info">
      <h2>Паспортные данные</h2>

      <FilterSelect 
        id="citizenship"
        placeholder="Начинте вводить для фильтрации"
        label="Гражданство"
        :selectedValue="formData.citizenship"
        :filteredDropdown="filteredCitizenships"
        dataKey="id"
        dataValue="nationality"
        v-model="citizenshipFilter"
        @onInput="citizenshipFilterWatch"
        @onDropdownClick="onCitizenshipClicked"
      />

      <div
        v-if="isRussian"
        class="russian-citizenship"
      >
        <div  iv class="form-item passport-details">
          <Input 
            type="text"
            id="russianPassportSeries"
            label="Серия паспорта"
            v-model="formData.russianPassport.series"
            placeholder="1234"
            minlength="4"
            maxlength="4"
            pattern="(\d)+"
            required
          />

          <Input 
            type="text"
            id="russianPassportNumber"
            label="Номер паспорта"
            v-model="formData.russianPassport.number"
            placeholder="123456"
            minlength="6"
            maxlength="6"
            pattern="(\d)+"
            required
          />

          <Input 
            type="date"
            id="russianPassportRecieveDate"
            label="Дата выдачи"
            v-model="formData.russianPassport.recieveDate"
            :max="todayDate"
            required
          />

        </div>
      </div>

      <div
        v-else
        class="foreign-citizenship"
      >
        <div class="form-item fullname-latin-container">
          <Input 
            type="text"
            id="latinLastName"
            label="Фамилия на латинице"
            v-model="formData.foreignPassport.latinLastName"
            placeholder="Ivanov"
            pattern="([a-zA-Z])+"
            required
          />

          <Input 
            type="text"
            id="latinFirstName"
            label="Имя на латинице"
            v-model="formData.foreignPassport.latinFirstName"
            placeholder="Ivan"
            pattern="([a-zA-Z])+"
            required
          />
        </div>

        <div class="form-item passport-details">
          <Input 
            type="text"
            id="foreignPassportNumber"
            label="Номер паспорта"
            v-model="formData.foreignPassport.number"
            placeholder="Введите номер паспорта"
            required
          />

          <Select
            id="foreign-country"
            placeholder="Выберите страну"
            :value="formData.foreignPassport.country"
            label="Страна выдачи"
            dataKey="id"
            dataValue="flag"
            :dropdownItems="allCitizenships"
            @onDropdownClick="onPassportCountryClicked"
          />

          <Select
            id="foreign-passport-type"
            placeholder="Выберите тип паспорта"
            :value="formData.foreignPassport.type"
            label="Тип паспорта"
            dataKey="id"
            dataValue="type"
            :dropdownItems="allPassportTypes"
            @onDropdownClick="onPassportTypeClicked"
          />

        </div>
      </div>

      <div class="name-change-container">
        <h3>Меняли ли фамилию или имя?</h3>

        <RadioInput 
          name="name-change"
          :values="nameChangeRadio"
          v-model="nameChange"
        />

        <div
          class="column"
          v-if="isNameChange"
        >
          <div class="form-item name-change-inputs-container">
            <Input
              type="text"
              id="previousLastName"
              label="Предыдущая фамилия"
              v-model="formData.changedName.previousLastName"
              pattern="([а-яёА-ЯЁ])+"
              placeholder="Введите предыдущую фамилию"
            />
            <Input
              type="text"
              id="previousFirstName"
              label="Предыдущее имя"
              v-model="formData.changedName.previousFirstName"
              pattern="([а-яёА-ЯЁ])+"
              placeholder="Введите предыдущее имя"
            />
          </div>
          <div class="form-item-comment">
            Введите предыдущую фамилию или предыдущее имя на русском языке, если имеется
          </div>
        </div>
        
      </div>
    </div>

    <div class="form-item">
      <SubmitButton />
    </div>

  </form>
</template>

<script>
import { debounce } from '@/helpers/debounce.js';
import { cloneDeep } from 'lodash';

import Input from '@/components/Input/Input.vue';
import RadioInput from '@/components/Input/RadioInput.vue';
import FilterSelect from '@/components/Input/FilterSelect';
import Select from '@/components/Input/Select';
import SubmitButton from '@/components/Input/SubmitButton.vue'

import citizenships from '@/assets/data/citizenships.json';
import passportTypes from '@/assets/data/passport-types.json';

export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        patronymic: '',
        birthday: '',
        email: '',
        gender: 'Мужской',
        citizenship: 'Russia',
        russianPassport: {
          series: '',
          number: '',
          recieveDate: '',
        },
        foreignPassport: {
          latinFirstName: '',
          latinLastName: '',
          number: '',
          country: '🇷🇺',
          type: 'Национальный паспорт',
        },
        changedName: {
          previousFirstName: '',
          previousLastName: '',
        }
      },
      nameChange: 'Нет',
      citizenshipFilter: '',
      fakeCitizenshipFilter: '',
      debouncedCitizenshipFilter: null,

      allCitizenships: citizenships,
      allPassportTypes: passportTypes,
      todayDate: '',
      genderRadio: [
        {
          id: 'male',
          value: 'Мужской'
        },
        {
          id: 'female',
          value: 'Женский'
        },
      ],
      nameChangeRadio: [
        {
          id: 'no-name-change',
          value: 'Нет'
        },
        {
          id: 'yes-name-change',
          value: 'Да'
        },
      ],
      formDataTemplate: {},
    };
  },
  components: {
    Input,
    RadioInput,
    FilterSelect,
    Select,
    SubmitButton,
  },
  created() {
    this.debouncedCitizenshipFilter = debounce(this.getCitizenships, 500);
    this.todayDate = this.defineTodaysDate();
    this.formDataTemplate = cloneDeep(this.formData);
  },
  methods: {
    onCitizenshipClicked(citizenship) {
      this.formData.citizenship = citizenship.nationality;
    },
    getCitizenships(citizenshipFilter) {
      this.fakeCitizenshipFilter = citizenshipFilter;
    },
    citizenshipFilterWatch(citizenshipFilter) {
      this.debouncedCitizenshipFilter(citizenshipFilter);
    },
    onPassportTypeClicked(passportType) {
      this.formData.foreignPassport.type = passportType.type;
    },
    onPassportCountryClicked(citizenship) {
      this.formData.foreignPassport.country = citizenship.flag;
    },
    onSubmit() {
      if (this.isRussian) {
        delete this.formData.foreignPassport;
      } else {
        delete this.formData.russianPassport;
      }

      if (!this.isNameChange) {
        delete this.formData.changedName;
      }

      console.log(JSON.stringify(this.formData));
      this.resetFormData();
    },
    defineTodaysDate() {
      const dateNow = new Date();
      return `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;
    },
    resetFormData() {
      this.formData = cloneDeep(this.formDataTemplate);
      this.nameChange = 'Нет';
      this.citizenshipFilter = '';
      this.fakeCitizenshipFilter = '';
    }
  },
  computed: {
    isNameChange() {
      if (this.nameChange === 'Да') {
        return true;
      } else {
        return false;
      }
    },
    isRussian() {
      if (this.formData.citizenship === 'Russia') {
        return true;
      } else {
        return false;
      }
    },
    filteredCitizenships() {
      if (!this.fakeCitizenshipFilter.trim()) {
        return this.allCitizenships;
      } else {
          return this.allCitizenships.filter(citizenship => citizenship.nationality.toLowerCase().startsWith(this.fakeCitizenshipFilter.toLowerCase().trim()));
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  width: 800px;
  border: solid 2px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.form-item {
  margin: 20px 0;
  position: relative;
}

.form-item-comment {
  font-style: italic;
  font-size: 12px;
  color: #999999;
}

.birthday-container {
  width: 300px;
}

.passport-details {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 2fr;
}

.fullname-container,
.fullname-latin-container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.name-change-inputs-container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.column {
  display: flex;
  flex-direction: column;
}

</style>
