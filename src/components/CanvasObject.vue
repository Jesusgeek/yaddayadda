<script>
import {fabric} from 'fabric-browseronly'

const CANVAS_OBJECT_EVENTS = [
  // "added",
  // "removed",
  "selected",
  "deselected",
  // "modified",
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
    name: "canvas-object",
    // mixins: [....]

    props: {
        id: { type: Number, required: true },
        item: {
          type: Object,
          required: true,
          // validator: function(val) {
          //   //return  ['iwas','nochwas'].indexOf(val) !== -1
          // }
        }
    },
    data() { return { canvasItem: null, } },

    inject:  ["$canvas", ],
    computed: { canvas() { return this.$canvas() }, },

    // |RENDER| Falls Elemente verschachtelt übergeben werden, diese auch rendern; ansonsten keine Ausgabe
    render(h) { return this.$slots.default ? h("div", this.$slots.default) : undefined; }, 

    watch: {
        // INFO: Im Fall einer Gruppe, statt canvas "Gruppen-Parent" überwachen
        canvas: { handler(newVal) { if (newVal) { 
            //console.log("watch canvas val: "+newVal) } 
            
            //this.line = new fabric.Line([0,0,300,200], {fill:'red', stroke:'blue'})
            //var line = new fabric.Line([0,0,200,0], {fill:'red', stroke:'blue'})
            this.canvasItem = new fabric.Rect({top:this.item.t, left:this.item.l, width:this.item.w, height:this.item.h, fill:'#cccccc22', stroke:'#ccccccaa'})
            /* ggf stattdessen zu gruppe hinzufügen */
            //this.canvas.add(line)
            this.canvas.add(this.canvasItem)
            this.registerEvents(true)

        }}, immediate:true },
    },

    methods: {
      registerEvents(onoff) {
        // canvasEvents.forEach(event => {
        //   if (onoff)
        //     this.canvas.on(event, e => this.$emit(event.split(":").join("-"), e))
        //   else
        //     this.canvas.off(event, this.$emit(event.split(":").join("-")))
        //})
        CANVAS_OBJECT_EVENTS.forEach(event => { 

          if (onoff)
            this.canvasItem.on(event, e => { this.$emit(event, { id: this.id, ...e })})

          else if (this.canvasItem)
            this.canvasItem.off(event)
        })
      }
    },

    beforeDestroy() { 
      this.registerEvents(false)
      this.canvas.remove(this.canvasItem) 
    },
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
    render: function (h) {
      let nodes = this.value
      if (!Array.isArray(nodes)) {
        nodes = [nodes]
      }
      return h(this.tag, this.options, nodes)
    }
  })
  */

</script>
