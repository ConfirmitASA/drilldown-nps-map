
import DrilldownMap from "./DrilldownMap";
import ReportalBase from "r-reportal-base";

window.Reportal = window.Reportal || {};
ReportalBase.mixin(window.Reportal,{
  DrilldownMap,
  ReportalBase
});

export default DrilldownMap
