(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.en=function(n){return n===1?"one":"other"}

window.i18n["ch/maenulabs/validation/AtLeastCheck"] = {}
window.i18n["ch/maenulabs/validation/AtLeastCheck"]["message"] = function(d){return "Must be at least "+v(d,"amount")}
window.i18n["ch/maenulabs/validation/AtMostCheck"] = {}
window.i18n["ch/maenulabs/validation/AtMostCheck"]["message"] = function(d){return "Must be at most "+v(d,"amount")}
window.i18n["ch/maenulabs/validation/ExistenceCheck"] = {}
window.i18n["ch/maenulabs/validation/ExistenceCheck"]["message"] = function(d){return "Is required"}
window.i18n["ch/maenulabs/validation/GreaterThanCheck"] = {}
window.i18n["ch/maenulabs/validation/GreaterThanCheck"]["message"] = function(d){return "Must be greater than "+v(d,"amount")}
window.i18n["ch/maenulabs/validation/LessThanCheck"] = {}
window.i18n["ch/maenulabs/validation/LessThanCheck"]["message"] = function(d){return "Must be less than "+v(d,"amount")}
window.i18n["ch/maenulabs/validation/StringLengthRangeCheck"] = {}
window.i18n["ch/maenulabs/validation/StringLengthRangeCheck"]["minimum"] = function(d){return "Must be at least "+p(d,"amount",0,"en",{"one":"1 character","other":n(d,"amount")+" characters"})+" long"}
window.i18n["ch/maenulabs/validation/StringLengthRangeCheck"]["maximum"] = function(d){return "Must be at most "+p(d,"amount",0,"en",{"one":"1 character","other":n(d,"amount")+" characters"})+" long"}
})();