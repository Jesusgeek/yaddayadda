<script>
import {fabric} from 'fabric-browseronly'

export default {
    name: "canvas-object",
    // mixins: [....]
    props: {
        item: {
          type: Object,
          //default: function() { return {msg:'iwas}},
          required: true,
          // validator: function(val) {
          //   //return  ['iwas','nochwas'].indexOf(val) !== -1
          // TODO: Check, hat x,y,w,h etc.
          // }
        }
    },

    inject:  ["$canvas", ],
    computed: { canvas() { return this.$canvas() }, },

    //console.log("render: "+h)
    //console.log("slots default: "+this.$slots.default)
    // |RENDER| Falls Elemente verschachtelt übergeben werden, diese auch rendern; ansonsten keine Ausgabe
    render(h) { return this.$slots.default ? h("div", this.$slots.default) : undefined; }, 

    watch: {
        // INFO: Im Fall einer Gruppe, statt canvas "Gruppen-Parent" überwachen
        canvas: { handler(newVal) { if (newVal) { 
            //console.log("watch canvas val: "+newVal) } 
            
            //this.line = new fabric.Line([0,0,300,200], {fill:'red', stroke:'blue'})
            //var line = new fabric.Line([0,0,200,0], {fill:'red', stroke:'blue'})
            var rect = new fabric.Rect({top:40, left:10, width:140, height:40, fill:'#cccccc22', stroke:'#ccccccaa'})
            /* ggf stattdessen zu gruppe hinzufügen */
            //this.canvas.add(line)
            this.canvas.add(rect)

        }}, immediate:true },
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
