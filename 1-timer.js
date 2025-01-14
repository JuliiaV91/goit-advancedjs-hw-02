import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as a,f as m}from"./assets/vendor-Dov3POoy.js";const s=document.querySelector("[data-start]"),d=document.querySelector("#datetime-picker");s.disabled=!0;const r={deadline:null,intervalId:null,elements:{days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")},start(){s.disabled=!0,d.disabled=!0,this.intervalId=setInterval(()=>{const t=this.deadline.getTime()-Date.now();if(t<=0){this.stop(),this.updateUI(0,0,0,0),a.success({title:"Timer Finished",message:"The countdown has reached the end!",position:"topRight"}),d.disabled=!1;return}const{days:e,hours:n,minutes:o,seconds:i}=this.convertMs(t);this.updateUI(e,n,o,i)},1e3)},stop(){clearInterval(this.intervalId),this.intervalId=null},updateUI(t,e,n,o){this.elements.days.textContent=this.pad(t),this.elements.hours.textContent=this.pad(e),this.elements.minutes.textContent=this.pad(n),this.elements.seconds.textContent=this.pad(o)},convertMs(t){const u=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:c,minutes:l,seconds:h}},pad(t){return String(t).padStart(2,"0")}};m("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0];if(!e||e<=new Date){a.error({title:"Invalid Date",message:"Please choose a date in the future",position:"topRight"}),s.disabled=!0;return}a.success({title:"Valid Date",message:"You can now start the countdown!",position:"topRight"}),r.deadline=e,s.disabled=!1}});s.addEventListener("click",()=>r.start());
//# sourceMappingURL=1-timer.js.map
