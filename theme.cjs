'use strict';
// 青竹石墨: static light colors for original diagrams; runtime tokens for CSS.
const palette={paper:'#f2f6f4',surface:'#fcfefd',ink:'#213a2f',primary:'#28745a',muted:'#536b5e',body:'#354f41',line:'#c1d2c8',tint:'#e0eee7',hover:'#22654e',decorative:'#bdcfc3',inverseMuted:'#deeee5'};
const replacements={};
function group(hexes,role){for(const hex of hexes.split(' '))replacements[hex]=role;}
group('#20382f','ink');
group('#234b3d #30442c #4e7049 #4f6b46 #48623c #53674b #547142 #547747 #557148 #45785c #4e7547 #aa8e53 #769a4b #819e55 #91a76e #96ad67','primary');
group('#355e47','hover');
group('#4e6157 #63745b #667a59','body');
group('#5e7a4a #626e62 #647b4b #667b52 #6a7c58 #6c7c5a #6d7b5f #6e7b4d #6f805d #6f815c #6f8959 #71845c #747b72 #758071 #77768c #78806f #78836c #78836d #78866b #79836f #7b876e #7b886d #7c8872 #7c8876 #7c8c6b #7d8a6c #7d8a70 #7e8c6e #7e926e #82916d #82966a #83916f #859171 #859176 #879080 #87917b #879278 #879773 #88947e #8a9679 #8b987b #8b9b77 #8c9385 #8c987c #8e9688 #8e9a79 #909786 #909981 #919987 #919a88 #94a17d #97a18c #748167','muted');
group('#9caf7b #9eaf88 #a4b58c #acb89a #b7c5a4','muted');
group('#b5c4b1 #b5ca9f #c1cfc2 #d9e4d2','inverseMuted');
group('#cfddd3 #d4dfbe #e2d8c3','decorative');
group('#d9ec93 #e3e9d8 #eaf0e2 #eff1ea #eff3e7 #eff3e8 #eeeeef #eaf1ed #e7eeea #e3f2ad #eaf1dc #edf2e3 #edf3e0 #eef3e3 #eaf0df #edf1e8 #f1f4e9 #f4f7ed #f0f2e9 #f0f3e9 #e9efde #f0eade #f6efe0','tint');
group('#dce2ce #dde3d4 #dfe6d6 #e0e6d7 #e1e6db #e6ebde #edf0e6 #edf0e7 #edf0e8 #d5decb','line');
group('#fafbf7 #fafcf6','paper');
group('#fcfdf9 #fff #ffffff','surface');
function transform(input,{css=false}={}){return input.replace(/#[\da-f]{3,8}\b/gi,hex=>{const key=hex.toLowerCase(),role=replacements[key];if(role)return css?`var(--theme-${role})`:palette[role];if(key.length===9){const opacity=parseInt(key.slice(-2),16)/255;return css?`rgb(var(--theme-shadow-rgb) / ${opacity.toFixed(3)})`:'#213a2f'+key.slice(-2);}return hex;});}
module.exports={palette,transform};
