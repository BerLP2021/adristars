function e(){import.meta.url,import("_").catch((()=>1)),async function*(){}().next()}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();document.getElementById("my-popover").addEventListener("beforetoggle",(e=>{"open"===e.newState?document.body.classList.add("popover-open"):"closed"===e.newState&&document.body.classList.remove("popover-open")})),document.querySelectorAll('.insurance_plan input[type="radio"]').forEach((e=>{e.addEventListener("keydown",(t=>{"Enter"===t.key&&(t.preventDefault(),e.checked=!0)}))}));(()=>{const e=document.querySelectorAll('.product_extras .option_item[data-included="true"]');0!==e.length&&e.forEach((e=>{e.classList.add("option_item__active");const t=e.querySelector(".option_btn use"),n=t.getAttribute("href").split("#")[0].concat("#","minus");t.setAttribute("href",n),e.style.pointerEvents="none"}))})();var t=0;{let e=function(e){const t=document.querySelector("#"+e).parentElement;if(!t)return;const n=t.querySelector(".option_title").textContent,o=t.querySelector(".option_price").textContent;let r=document.querySelector("#extras-options");if(!r){r=document.createElement("ul"),r.classList.add("form_summary"),r.setAttribute("id","extras-options"),r.innerHTML='<span class="extras-title">Extras:</span>';const e=document.querySelector(".form_summary-total");e?e.insertAdjacentElement("beforebegin",r):document.querySelector("#extrasForm").appendChild(r)}const c=r.getElementsByClassName("form_summary-item");let s=null;Array.from(c).forEach((e=>{var t;(null==(t=e.querySelector(".form_summary-title"))?void 0:t.textContent)===n&&(s=e)}));const a=document.querySelector("#"+e).checked;a&&!s?((e,t,n)=>{const o=parseFloat(t.replace(/[^\d,]/g,"").replace(",","."));if(Number.isNaN(o))return;const r=document.createElement("li");r.className="form_summary-item",r.innerHTML='\n            <div class="form_summary-title">'.concat(e,'</div>\n            <div class="form_summary-value">\n                <span class="extras-price">').concat(t,"</span>\n            </div>\n        "),n.appendChild(r)})(n,o,r):!a&&s&&s.remove(),0===c.length&&r.remove()};document.querySelector(".extras_options").addEventListener("change",(function(t){const o=t.target;if(o.matches(".option_item input")){const t=o.closest(".option_item"),r=t.querySelector(".option_btn use"),c=r.getAttribute("href"),s=o.checked,a=c.split("#")[0].concat("#",s?"minus":"plus");r.setAttribute("href",a),t.classList.toggle("option_item__active"),e(o.id),n()}}))}{let e=function(){const e=document.querySelector("#insurance-plan .form_summary-title"),t=document.querySelector("#insurance-plan #insurance-price");e.textContent=document.querySelector('#product_insurance .insurance_plan:has(input[type="radio"]:checked) .insurance_plan-title').textContent;const n=document.querySelector('#product_insurance .insurance_plan:has(input[type="radio"]:checked) .insurance_plan-price').textContent;t.textContent=n.replace(/[^\d,]/g,"").replace(",",".")?n.replace(/[^\d,]/g,"").replace(",",".")+" EUR":n};const t=document.querySelector(".product_insurance");e(),n(),t.addEventListener("change",(function(t){const o=t.target;o.matches(".insurance_plan input")&&(e(o.id),n())}))}function n(){const e=document.querySelector("#basic-price").textContent.replace(/[^\d,]/g,"").replace(",","."),n=document.querySelector("#insurance-price").textContent.replace(/[^\d,]/g,"").replace(",",".")||0,o=document.querySelector("#total-price"),r=Array.from(document.querySelectorAll(".extras-price")).map((e=>parseFloat(e.textContent.replace(/[^\d,]/g,"").replace(",",".")))).reduce(((e,t)=>e+t),0);t=(parseFloat(e)+parseFloat(n)+r).toFixed(2),o.textContent=t+" EUR"}{let e=function(){d.matches?(u<3&&(s.style.display="inline"),u>0&&"Continue"!==s.textContent&&(s.textContent="Continue"),l.style.display=0===u?"none":"flex",p.forEach(((e,t)=>{e.classList.toggle("hidden",t!==u),e.classList.toggle("visible",t===u),t!==u?o(e):r(e)})),a[0].textContent="Pay Later ".concat(t," EUR "),a[1].textContent="Pay Now ".concat(t," EUR")):(s.style.display="none",l.style.display="none",a[0].textContent="Pay Cash",a[1].textContent="Pay Card")},n=function(){d.matches&&u<p.length-1&&(0===u&&(l.style.display="none"),p[u].classList.remove("visible"),p[u].classList.add("fading-out"),setTimeout((()=>{p[u].classList.add("hidden"),p[u].classList.remove("fading-out"),u++,u>0&&"Continue"!==s.textContent&&(s.textContent="Continue"),u>0&&(l.style.display="flex"),p[u].classList.remove("hidden"),p[u].classList.add("visible"),o(p[u-1]),r(p[u]),p[u].querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])')[0].focus(),i[u-1].classList.add("order-step__active"),u-2>=0&&(i[u-2].classList.toggle("order-step__active"),i[u-2].classList.add("order-step__done")),u===p.length-1&&(s.style.display="none",c.classList.add("fading-out"),c.classList.add("hidden"),c.classList.remove("fading-out"))}),400),a[0].textContent="Pay Later ".concat(t," EUR "),a[1].textContent="Pay Now ".concat(t," EUR"))},o=function(e){e.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])').forEach((e=>{var t;e.dataset.prevTabindex=null!=(t=e.getAttribute("tabindex"))?t:"",e.setAttribute("tabindex","-1")}))},r=function(e){e.querySelectorAll('[tabindex="-1"]').forEach((e=>{const t=e.dataset.prevTabindex;void 0!==t&&(""===t?e.removeAttribute("tabindex"):e.setAttribute("tabindex",t)),delete e.dataset.prevTabindex}))};const c=document.querySelector(".product_info"),s=document.getElementById("order_presubmit_btn"),a=document.querySelectorAll(".order_submit-text"),i=document.querySelectorAll(".order-step"),l=document.querySelector(".product_order-progress"),d=window.matchMedia("(max-width: 1463px)");let u=0;const p=[document.getElementById("product_description"),document.getElementById("product_extras"),document.getElementById("product_insurance"),document.getElementById("form_order")];e(),window.addEventListener("resize",e),s.addEventListener("click",n)}{let e=function(e,t){const o=n[t];let r=e.replace(/[^0-9]/g,"");const c=o.code.replace("+","").length;if(r=r.substring(c),"US"===t||"UA"===t){if(r.length>0){let e=o.code+" ";return r.length<=3?e+="(".concat(r,")"):r.length<=6?e+="(".concat(r.substring(0,3),") ").concat(r.substring(3)):e+="(".concat(r.substring(0,3),") ").concat(r.substring(3,6),"-").concat(r.substring(6,10)),e}}else if("UK"===t){if(r.length>0){let e=o.code+" ";return r.length<=4?e+=r:r.length<=7?e+="".concat(r.substring(0,4)," ").concat(r.substring(4)):e+="".concat(r.substring(0,4)," ").concat(r.substring(4,7)," ").concat(r.substring(7,10)),e}}else if("DE"===t&&r.length>0){let e=o.code+" ";return r.length<=3?e+=r:r.length<=6?e+="".concat(r.substring(0,3)," ").concat(r.substring(3)):r.length<=9?e+="".concat(r.substring(0,3)," ").concat(r.substring(3,6)," ").concat(r.substring(6)):e+="".concat(r.substring(0,3)," ").concat(r.substring(3,6)," ").concat(r.substring(6,9)," ").concat(r.substring(9,11)),e}return o.code+" "},t=function(){const e=o.value,t=n[e],c=r.value.replace(/[^0-9]/g,"").substring(t.code.replace("+","").length),s=+r.dataset.length;c.length!==s?r.setCustomValidity("Phone number must be ".concat(s," digits long for ").concat(e,".")):/^\d+$/.test(c)?r.setCustomValidity(""):r.setCustomValidity("Phone number must contain only digits.")};const n={US:{code:"+1",length:10,minLength:17,placeholder:"+1 (555) 000-0000"},UK:{code:"+44",length:10,minLength:16,placeholder:"+44 1234 567 890"},DE:{code:"+49",length:11,minLength:18,placeholder:"+49 123 456 789 01"},UA:{code:"+38",length:10,minLength:18,placeholder:"+38 (123) 456-7890"}},o=document.getElementById("country-code-select"),r=document.getElementById("phone");Object.entries(n).forEach((e=>{const t=document.createElement("option");t.value=e[0],t.textContent=e[0],o.appendChild(t)})),o.addEventListener("change",(()=>{const c=o.value,s=n[c];r.placeholder=s.placeholder,r.dataset.length=s.length;let a=r.value;if(a){const t=a.split(" ")[0];t!==n[c].code&&(a=a.replace(t,n[c].code)),r.value=e(a,c)}t()})),r.addEventListener("input",(r=>{let c=r.target.value.replace(/[^0-9+]/g,"");const s=o.value,a=n[s].code;c.startsWith(a)||(c=a+" "+c.replace(a,"")),r.target.value=e(c,s),t()})),o.dispatchEvent(new Event("change"))}document.querySelector(".product").addEventListener("submit",(function(e){e.preventDefault();const t=new FormData(e.target),n=t.getAll("extras-options").join(","),o=Object.fromEntries(t);o["extras-options"]=n||"",alert(JSON.stringify(o,null,2)),window.location.reload()}));export{e as __vite_legacy_guard};
