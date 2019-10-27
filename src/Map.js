import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import "./Map.scss"

export default function Map(props) {
  
  //TODO
  //Set timeout is here because the div needs to be rendered on the screen
  //before this code runs, so this function has to and return the div first.
  //This is probably a terrible way of doing this, and should be fixed
  setTimeout(() => {
    //create map instance
    let map = am4core.create("mapdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;  

    //set projection
    map.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#043565");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#5158bb");

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add some data
    polygonSeries.data = [];

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";
    
    // Create image series
    var imageSeries = map.series.push(new am4maps.MapImageSeries());

    // Set property fields
    imageSeries.propertyFields.latitude = "latitude";
    imageSeries.propertyFields.longitude = "longitude";

    // Add zoom control
    map.zoomControl = new am4maps.ZoomControl();
  }, 0);

  return (
    <div id="mapdiv" style={{ width: "100vw", height: "100vh" }}></div>
  )
}