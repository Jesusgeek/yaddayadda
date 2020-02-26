<script>
import Vue from 'vue';
export default {

  name: 'Layout',
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  created() {

    // Ein bisschen Premature Optimization :)
    if (!Vue.options.components[this.name]) {
      Vue.component(
        this.name,
        () => import(`../layouts/${this.name}.vue`),
      );
    }

    // Für die View die dieses Layout einbindet ...
    this.$parent.$emit('update:layout', this.name);
  },

  // Renderless Component
  render() { return this.$slots.default[0]; },
};
</script>