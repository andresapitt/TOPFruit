define(["Ti/_/declare","Ti/_/Filesystem/Local","Ti/App/Properties"],function(e,i,r){var t=r.getString("ti.fs.backend");return e("Ti.Filesystem.File",t?require(t):i)});