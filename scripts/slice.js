/* 

Tilemap slicers, used to cut tiles out of a tilemap.

version 1.0.0
Author: Reece Harris
Date: 2022 Aug 23

*/

const tileNames = [
    /* {biome}-{detail1}_{detail2} */
    'grass-hills',
    'snow-castle',
    'grass-forest',
    'desert-base_1',
    'grass-hills_forest',
    'lightgrass_base',
    'desert-hills',
    'snow-mountain',
    'tallgrass-base',
    'desert-base_2',
    'shallowwater_base',
    'snow-base',
    'desert-mountain',
    'deep-water_base',
    'snow-forest',
    'water-dock_east',
    'desert-oasis',
    'snow-forest_2',
    'grass-metropolis',
    'water-dock_west',
    'sand-metropolis_destroyed',
    'snow-hills',
    'grass-metropolis_2',
    'sand-metropolis',
    'grass-metropolis_3',
    'snow-hills_forest',
    'base-grass',
    'water-lighthouse',
    'water-broken_ice',
    'grass-light_forest',
    'grass-metropolis_destroyed',
    'sand-metropolis_2',
    'sand-unkown_2',
    'lightgrass-forest',
    'grass-forest_2',
    'snow-metropolis',
    'lightgrass-metropolis',
    'lightgrass-swamp',
    'lightgrass-unkown'
]

numColsToCut = 38;
numRowsToCut = 1;

widthOfOnePiece = 221;
heightOfOnePiece = 332;


function initSlice(b,c){var a=new Image;a.onload=function(){for(var f=[],d=0;d<numColsToCut;++d)for(var e=0;e<numRowsToCut;++e){var b=document.createElement("canvas");b.width=widthOfOnePiece,b.height=heightOfOnePiece,b.getContext("2d").drawImage(a,d*widthOfOnePiece,e*heightOfOnePiece,widthOfOnePiece,heightOfOnePiece,0,0,b.width,b.height),f.push(b.toDataURL())}var g=0;f.forEach(function(b){var a=document.createElement("img");a.src=b,a.title=tileNames[g],document.getElementById(c).appendChild(a),g++})},a.src=b}