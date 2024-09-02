<script setup>
import { ref } from 'vue';
import useMenuWidth from './menuWidth.js';

defineProps({
  label: String,
  value: Object,
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:value']);

const qSelectRef = ref(null);
const {
  onResize,
  observeMenuScrollbarWidth,
  stopObservingMenuScrollbarWidth,
  maxItemWidth,
} = useMenuWidth(qSelectRef);
</script>
<template>
  <div>
    <q-select
      ref="qSelectRef"
      filled
      :label
      :model-value="value"
      :options
      clearable
      @update:model-value="(val) => emit('update:value', val)"
      @popup-show="observeMenuScrollbarWidth()"
      @popup-hide="stopObservingMenuScrollbarWidth()"
    >
      <template v-slot:selected-item="{ opt }">
        <span class="ellipsis">{{ opt.label }}</span>
      </template>
      <template #option="{ itemProps, opt }">
        <q-item v-bind="itemProps" :style="{ maxWidth: maxItemWidth }">
          <q-item-section>
            <q-item-label :lines="1">{{ opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-resize-observer @resize="onResize" />
  </div>
</template>
