var path = require('path');
var glob = require('glob');
var assign=require("object-assign");

function getEntry(globPath,options={}) {
  
    options=assign({nodir: true},options);
	var files = glob.sync(globPath,options);
  
	var entries = {},
		entry, dirname, basename, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		
		entries[basename] =[entry] ;
	}
	return entries;
}
module.exports=getEntry;