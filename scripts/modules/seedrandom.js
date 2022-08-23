/* 
Seeded random number generator for Javascript.
---
version 2.3.10
Author: David Bau
Date: 2014 Sep 20
*/

!function(l,f,a,d,g,m,b,c,e){var h,n=a.pow(d,g),i=a.pow(2,52),o=2*i,p=d-1,j=a["seed"+e]=function(c,b,j){var h=[];b=!0==b?{entropy:!0}:b||{};var l=k(r(b.entropy?[c,t(f)]:null==c?s():c,3),h),m=new q(h);return k(t(m.S),f),(b.pass||j||function(b,c,d){return d?(a[e]=b,c):b})(function(){for(var a=m.g(g),c=n,b=0;a<i;)a=(a+b)*d,c*=d,b=m.g(1);for(;a>=o;)a/=2,c/=2,b>>>=1;return(a+b)/c},l,"global"in b?b.global:this==a)};function q(e){var h,f=e.length,c=this,a=0,g=c.i=c.j=0,b=c.S=[];for(f||(e=[f++]);a<d;)b[a]=a++;for(a=0;a<d;a++)b[a]=b[g=p&g+e[a%f]+(h=b[a])],b[g]=h;(c.g=function(h){for(var f,g=0,b=c.i,e=c.j,a=c.S;h--;)f=a[b=p&b+1],g=g*d+a[p&(a[b]=a[e=p&e+f])+(a[e]=f)];return c.i=b,c.j=e,g})(d)}function r(a,c){var d,b=[],e=typeof a;if(c&&"object"==e)for(d in a)try{b.push(r(a[d],c-1))}catch(f){}return b.length?b:"string"==e?a:a+"\0"}function k(d,b){for(var e,c=d+"",a=0;a<c.length;)b[p&a]=p&(e^=19*b[p&a])+c.charCodeAt(a++);return t(b)}function s(a){try{if(h)return t(h.randomBytes(d));return l.crypto.getRandomValues(a=new Uint8Array(d)),t(a)}catch(b){return[+new Date,l,(a=l.navigator)&&a.plugins,l.screen,t(f)]}}function t(a){return String.fromCharCode.apply(0,a)}if(k(a[e](),f),b&&b.exports){b.exports=j;try{h=require("crypto")}catch(u){}}else c&&c.amd&&c(function(){return j})}(this,[],Math,256,6,52,"object"==typeof module&&module,"function"==typeof define&&define,"random")