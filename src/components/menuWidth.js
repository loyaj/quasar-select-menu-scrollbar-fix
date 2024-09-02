import { computed, nextTick, ref } from 'vue';

export default function useMenuWidth(qSelectRef) {
  const selectWidth = ref(0);

  function onResize(size) {
    selectWidth.value = size.width;
  }

  const scrollbarWidth = ref(0);
  const maxItemWidth = computed(
    () => selectWidth.value - scrollbarWidth.value + 'px',
  );

  let observer;
  async function observeMenuScrollbarWidth() {
    await nextTick();
    const menuEl = getMatchingMenuEl();
    observer = new ResizeObserver(() => measureScrollBarWidth(menuEl));
    observer.observe(menuEl);
  }

  async function stopObservingMenuScrollbarWidth() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function getMatchingMenuEl() {
    const selectFieldId = qSelectRef.value.$el.htmlFor;
    return document.querySelector(`#${selectFieldId}_lb`);
  }

  /*
  Based on code linked by github user @metalsadman in the quasar issue tracker.
  https://github.com/quasarframework/quasar/discussions/16630#discussioncomment-7707877
  https://codepen.io/metalsadman/pen/PoOvqBB
  */
  function measureScrollBarWidth(menuEl) {
    if (isScrollbarVisible(menuEl)) {
      let el = document.createElement('div');
      el.style.cssText =
        'overflow:scroll; visibility:hidden; position:absolute;';
      qSelectRef.value.$el.appendChild(el);
      let w = el.offsetWidth - el.clientWidth;
      el.remove();
      scrollbarWidth.value = w;
    } else {
      scrollbarWidth.value = 0;
    }
  }

  function isScrollbarVisible(menuEl) {
    return menuEl.scrollHeight > menuEl.clientHeight;
  }

  return {
    onResize,
    observeMenuScrollbarWidth,
    stopObservingMenuScrollbarWidth,
    maxItemWidth,
  };
}
