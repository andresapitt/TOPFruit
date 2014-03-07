<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Install App</title>
<link rel="stylesheet" href="default.css">
<title>App Install</title>
<meta name="viewport" id="viewport" content="width=320, user-scalable=no, minimum-scale=1, maximum-scale=1" />
<link rel="apple-touch-icon" href="images/installIcon.png"/>
 <style type="text/css">
    body {
      background: url(iphone-stripe-bkg.png) repeat #c5ccd4;
      font-family: Helvetica, arial, sans-serif;
    }
    .congrats {
      font-size: 16pt;
      padding: 6px;
      text-align: center;
    }
    .step {
      background: white;
      border: 1px #ccc solid;
      border-radius: 14px;
      padding: 4px 10px;
      margin: 10px 0;
	  display:block;
	  clear:both;
    }
    .instructions {
      font-size: 10pt;
	  display:inline-block;
	  line-height:60px;
	  float:left;
    }
    .arrow {
      font-size: 15pt;
	  float:right;
	  display:inline-block;
	  line-height:60px;
	  padding-right:10px;
    }
    .imagelink {
	  float:right;
	  display:inline-block;
    }
    table {
      width: 100%;
    }
	a{ color:#006;
	text-decoration:none;}
	.clear { clear: both; }
  </style>


</style>
</head>
<body>
	<div class="step">      
	<a href="itms-services://?action=download-manifest&url=http://www.vocal.ie<? echo dirname($_SERVER['PHP_SELF']); ?>/myApp.plist">
			<span class="instructions"><strong>IDL Perfect mix (iPhone)</strong></span>
            <span width="57" class="imagelink"> <img class="download" src="icon.png" width="60" height="60"/></span>
			<span width="24" class="arrow">&rarr;</span>          
		</a>
		<br class="clear" />
	</div>
	<br/>
	<div class="step">
		<a href="http://www.vocal.ie/Apps/IDL/PerfectMix/apk/The_Perfect_Mix.apk">
        	<span class="instructions"><strong>IDL Perfect mix (Android)</strong></span>
            <span width="57" class="imagelink"> <img class="download" src="icon.png" width="60" height="60"/></span>
            <span width="24" class="arrow">&rarr;</span>  
 		</a>
        <br class="clear" />
	</div>


</body>
</html>