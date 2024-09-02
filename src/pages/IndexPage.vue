<script setup>
import { ref } from 'vue';
import SelectField from 'src/components/SelectField.vue';

const fewOptions = [...Array(7)].map(generateOption);
const selectedOption1 = ref(null);

const manyOptions = [...Array(100)].map(generateOption);
const selectedOption2 = ref(null);

function generateOption(v, i) {
  return {
    label: `Option ${i} lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
    value: i,
  };
}
</script>
<template>
  <q-page class="q-pa-xl">
    <div class="row q-mb-md">
      <div class="col">
        <SelectField
          label="Few options"
          v-model:value="selectedOption1"
          :options="fewOptions"
        />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <SelectField
          label="Many options"
          v-model:value="selectedOption2"
          :options="manyOptions"
        />
      </div>
    </div>
    <div class="row q-mb-md">
      <p>
        This fix handles the case where scrollbars appear or disappear while the
        select menu is open.
      </p>
      <p>
        To demonstrate fix, click the 'Few options' select to open its menu,
        then drag the bottom of window to shorten the viewport until the menu
        has scrollbars. Notice that the menu items reactively change width to
        adjust for the appearance/disappearance of the scrollbar in the menu.
      </p>
    </div>
  </q-page>
</template>
