define(["Ti/_/declare","Ti/_/Map/Google","Ti/App/Properties"],function(e,i,r){var a=r.getString("ti.map.backend");return e("Ti.Map.View",a?require(a):i)});