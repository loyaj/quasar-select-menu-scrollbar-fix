<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div>QSelect: Constrain menu max-width</div>
          <div class="text-caption" style="margin-top: -5px">
            (account for appearing/disappearing menu scrollbars)
          </div>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="row text-subtitle1">
          <q-icon :name="fabGithub" class="q-pr-xs" />
          <span>Related Issues</span>
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { fabGithub } from '@quasar/extras/fontawesome-v6';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: '[Q-Select] Dropdown width for long option items',
    caption: 'github issue #12617',
    link: 'https://github.com/quasarframework/quasar/discussions/12617',
  },
  {
    title: 'Q-Select dropdown menu over size',
    caption: 'github issue #12678',
    link: 'https://github.com/quasarframework/quasar/issues/12678',
  },
  {
    title: '[Q-Select] drop down width cannot be set',
    caption: 'github issue #16630',
    link: 'https://github.com/quasarframework/quasar/discussions/16630',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      fabGithub,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
