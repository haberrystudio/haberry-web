/** Runs before first paint: turns on lite mode for data-saver, 2G links, or a saved choice. */
export const LITE_SCRIPT = `(function(){try{var d=document.documentElement,c=navigator.connection||{},s=null;try{s=localStorage.getItem("haberry-lite")}catch(e){}var on=s==="1"||(s!=="0"&&(c.saveData===true||/2g$/.test(c.effectiveType||"")));if(on)d.setAttribute("data-lite","")}catch(e){}})();`;
