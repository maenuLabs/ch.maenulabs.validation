(function(G){G['i18n']={lc:{"en":function(n){return n===1?"one":"other"}},
c:function(d,k){if(!d)throw new Error("MessageFormat: Data required for '"+k+"'.")},
n:function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: '"+k+"' isn't a number.");return d[k]-(o||0)},
v:function(d,k){i18n.c(d,k);return d[k]},
p:function(d,k,o,l,p){i18n.c(d,k);return d[k] in p?p[d[k]]:(k=i18n.lc[l](d[k]-o),k in p?p[k]:p.other)},
s:function(d,k,p){i18n.c(d,k);return d[k] in p?p[d[k]]:p.other}}
i18n["ch/maenulabs/validation/AtLeastCheck"]={
"message":function(d){return "Must be at least "+i18n.v(d,"amount")}}
i18n["ch/maenulabs/validation/AtMostCheck"]={
"message":function(d){return "Must be at most "+i18n.v(d,"amount")}}
i18n["ch/maenulabs/validation/ExistenceCheck"]={
"message":function(d){return "Is required"}}
i18n["ch/maenulabs/validation/GreaterThanCheck"]={
"message":function(d){return "Must be greater than "+i18n.v(d,"amount")}}
i18n["ch/maenulabs/validation/LessThanCheck"]={
"message":function(d){return "Must be less than "+i18n.v(d,"amount")}}
i18n["ch/maenulabs/validation/StringLengthRangeCheck"]={
"minimum":function(d){return "Must be at least "+i18n.p(d,"amount",0,"en",{"one":"1 character","other":i18n.n(d,"amount")+" characters"})+" long"},
"maximum":function(d){return "Must be at most "+i18n.p(d,"amount",0,"en",{"one":"1 character","other":i18n.n(d,"amount")+" characters"})+" long"}}
})(this);
