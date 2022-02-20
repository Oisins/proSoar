<template>
  <div id="moving-map"></div>
</template>

<script>

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import {
  DragZoom,
  defaults as defaultInteractions, Draw,
} from 'ol/interaction';
import {
  Control,
  defaults as defaultControls,
} from 'ol/control';
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import ScaleLine from 'ol/control/ScaleLine';
import Attribution from 'ol/control/Attribution';
import VectorSource from "ol/source/Vector";


export default {
  name: "moving-map",
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.map = new Map({
      target: 'moving-map',
      layers: [
        new TileLayer({
          name: "DFS",
          minZoom: 12,
          zIndex: 2,
          source: new XYZ({
            url: 'http://localhost:5000/map2/{z}/{x}/{y}.png',
            attributions: "DFS"
          })
        }),
        new TileLayer({
          name: "OpenAIP",
          zIndex: 3,
          maxZoom: 14,
          minZoom: 4,
          source: new XYZ({
            url: 'https://2.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{-y}.png',
            attributions: "OpenAIP"
          })
        }),
        // new TileLayer({
        //   name: "Hotspots",
        //   maxZoom: 14,
        //   minZoom: 12,
        //   source: new XYZ({
        //     url: 'http://2.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_approved_hotspots@EPSG%3A900913@png/{z}/{x}/{-y}.png"',
        //     attributions: "OpenAIP",
        //     tileSize: 1024,
        //   })
        // }),
        new TileLayer({
          name: "OSM",
          zIndex: 1,
          source: new OSM({})
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 4
      }),
      interactions: defaultInteractions().extend([new DragZoom()]),
      controls: defaultControls().extend([
        new LayerSwitcher({'ascending': false}),
        new ScaleLine({bar: true, minWidth: 128}),
        new Attribution({collapsible: false})
      ])
    });

    let draw = new Draw({
      source: new VectorSource(),
      type: "LineString",
    });
    this.map.addInteraction(draw);
    // snap = new Snap({source: source});
    // map.addInteraction(snap);
  }
}
</script>

<style scoped>

</style>