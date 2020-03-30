<script>
//import {fabric} from 'fabric-browseronly'

// eslint-disable-next-line no-unused-vars
const CANVAS_OBJECT_EVENTS = [
  // "added",
  // "removed",
  "selected",
  "deselected",
  "modified",
  // "moved",
  // "scaled",
  // "rotated",
  // "skewed",
  // "rotating",
  "scaling",
  "moving",
  // "skewing",
  // "mousedown",
  // "mouseup",
  // "mouseover",
  // "mouseout",
  // "mousewheel",
  // "mousedblclick",
  // "dragover",
  // "dragenter",
  // "dragleave",
  // "drop"
];

export default {

    // Renderless Component
    name: "canvas-object",
    render(h) { return this.$slots.default ? h("div", this.$slots.default) : undefined; },
    // mixins: [....]

    ////////////////////////////////////////////////////////////////////////////////////////////////

    props: {

      //id:   { type: Number,   required: true },
      rend: { type: Function, required: true }, //, default: () => { return null }}, 
      item: { type: Object,   required: true, deep: true, validator: function(val) { //['iwas','nochwas'].indexOf(val) !== -1
          return  Object.prototype.hasOwnProperty.call(val, 'a') && typeof val.a === 'number' && // ID
                  Object.prototype.hasOwnProperty.call(val, 'l') && typeof val.l === 'number' &&
                  Object.prototype.hasOwnProperty.call(val, 't') && typeof val.t === 'number' &&
                  Object.prototype.hasOwnProperty.call(val, 'w') && typeof val.w === 'number' &&
                  Object.prototype.hasOwnProperty.call(val, 'h') && typeof val.h === 'number';
      }},
      selected: { type:Boolean, default:false }, // durch Selektieren wird somit auch neu gerendert (kann auch gut sein)
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////

    data() { return { 
      canvasItem: null, /*updateDelay: null*/ 
      //modTimeout: null,
    } },

    inject:  ["$canvas", ],
    computed: { canvas() { return this.$canvas() }, },

    ////////////////////////////////////////////////////////////////////////////////////////////////

    //mounted() { console.log("CanvObj mounted", this.item.a)},
    watch: {

      // INFO: Im Fall einer Gruppe, statt canvas "Gruppen-Parent" überwachen
      canvas: { handler(nv) { if (nv) { this.createFabricItem({select:this.selected}) } }, immediate:true },

      // (Weil Objekt, wird Änderung des Inhalts nicht direkt als prop-Änderung erkannt -> watch deep)
      item: { handler(/*item*/) {  

        console.log("mod refresh",this.item)
        this.destroyFabricItem()
        this.createFabricItem({select:this.selected})
        // // if (this.updateDelay)
        // //   clearTimeout(this.updateDelay)
        // // this.updateDelay = setTimeout(() => {
        //   this.destroyFabricItem()
        //   this.createFabricItem({select:true})
        //   this.emitChanges()
        // // }, 100)

        // // // this.canvasItem.set({dirty: true}); 
        // // // this.canvas.requestRenderAll(); 
        // // // this.canvas.remove(this.canvasItem)
        // // // this.renderCanvasItem() // nicht wirklich gut ...
        //this.$forceUpdate();

        }, deep: true}
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////

    methods: {

      createFabricItem({select,}) { 

        //console.log({canvas:this.canvas, item:this.item, select})

        // Add to Canvas
        this.canvasItem = this.rend(this.item)
        this.canvasItem.hasRotatingPoint = false // TODO: <- evtl nicht hier, sondern jeweils in rend()?
        this.canvasItem.yaddaItemId = this.item.a // "inject" id
        this.canvas.add(this.canvasItem)

        if (select)
          this.canvas.setActiveObject(this.canvasItem) // setzt dieses als EINZIGES ausgewähltes Element

        // Events
        //this.canvasItem.on('modified', () => { this.emitChanges() })
        //this.canvasItem.on('selected', e => { console.log("%c Selected: ","color:orange; font-weight:bold;", {id: this.id, item: {...this.item}, fabricEvent: e}) })
        //CANVAS_OBJECT_EVENTS.forEach(e => { this.canvasItem.on (e, p => { this.$emit(e, { id: this.item.a, ...p }) }) }) 
        this.canvasItem.on('selected',   e => this.$emit('selected',   e /* = nur e */)) //{...e, id:this.item.a}))
        this.canvasItem.on('deselected', e => this.$emit('deselected', e /* = nur e */)) //{...e, id:this.item.a}))
        this.canvasItem.on('moving',  e => this.$emit('changing', e /* = e, target, selected */)) //{...e, id:this.item.a}))
        this.canvasItem.on('scaling', e => this.$emit('changing', e /* = e, target, selected */)) //{...e, id:this.item.a}))
        this.canvasItem.on('modified', e => {
          
          // // Full rerender / event-register
          // this.destroyFabricItem()
          // this.createFabricItem({select:this.selected})

          // Still emit "old" event???
          this.$emit('modified', e)
        })
      },

      destroyFabricItem() { 
        
        // Events
        if (this.canvasItem) this.canvasItem.off('modified')
        if (this.canvasItem) this.canvasItem.off('scaling')
        if (this.canvasItem) this.canvasItem.off('moving')
        if (this.canvasItem) this.canvasItem.off('deselected')
        if (this.canvasItem) this.canvasItem.off('selected')
        //CANVAS_OBJECT_EVENTS.forEach(e => { if (this.canvasItem) this.canvasItem.off(e) }) 
        //if (this.canvasItem) this.canvasItem.off('selected')
        

        // Remove from Canvas
        if (this.canvas && this.canvasItem) 
            this.canvas.remove(this.canvasItem) 
      },

      // emitChanges() {
      //   this.$emit('changed', {...this.canvasItem, id:this.id} )
      // },
    },
 
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Remove Eventhandling and FabricItem from vanvas
    beforeDestroy() { this.destroyFabricItem() },
}

/* noice:

  <wrap-node v-for='node of $slots.default' tag='li' :value='node' />

  Vue.component('wrap-node', {
    props: {
      value: {type: [Object, Array], required: true},
      tag: {type: String, default: 'div'},
      options: {
        type: Object, default: () => {
        }
      },
    },
    renderCanvasItem: function (h) {
      let nodes = this.value
      if (!Array.isArray(nodes)) {
        nodes = [nodes]
      }
      return h(this.tag, this.options, nodes)
    }
  })
  */

</script>
