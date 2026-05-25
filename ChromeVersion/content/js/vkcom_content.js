(function () {
"use strict";

function ready(f){
if(document.readyState!="loading")f();
else document.addEventListener("DOMContentLoaded",f);
}

function createPostBox(){

if(document.getElementById("vk_old_postbox")) return;

let container =
document.querySelector("#page_wall_posts") ||
document.querySelector("#feed_rows") ||
document.querySelector(".wall_posts");

if(!container) return;

let box = document.createElement("div");

box.id="vk_old_postbox";

box.style.cssText=`
background:#fff;
border:1px solid #dce1e6;
border-radius:8px;
padding:12px;
margin-bottom:10px;
font-family:Arial;
`;

box.innerHTML = `
<div style="display:flex;gap:10px">

<img src="/images/camera_50.png" width="40">

<div style="flex:1">

<div id="vk_old_text"
contenteditable="true"
style="
border:1px solid #dce1e6;
border-radius:6px;
padding:8px;
min-height:70px;
outline:none;
"
>Что у вас нового?</div>

<div style="margin-top:8px;display:flex;justify-content:space-between">

<div style="display:flex;gap:10px">

<button class="vk_old_attach" data="photo">📷 Фото</button>
<button class="vk_old_attach" data="video">🎬 Видео</button>
<button class="vk_old_attach" data="doc">📄 Документ</button>
<button class="vk_old_attach" data="poll">📊 Опрос</button>
<button class="vk_old_attach" data="music">🎵 Музыка</button>

</div>

<button id="vk_old_send"
style="
background:#4a76a8;
color:#fff;
border:none;
padding:6px 14px;
border-radius:6px;
cursor:pointer;
">Опубликовать</button>

</div>

</div>
</div>
`;

container.prepend(box);

initEvents();
}

function initEvents(){

let send = document.getElementById("vk_old_send");

send.onclick = async ()=>{

let text = document.getElementById("vk_old_text").innerText.trim();

if(!text){
alert("Введите текст");
return;
}

let form = new URLSearchParams();

form.append("act","post");
form.append("message",text);

try{

await fetch("/al_wall.php",{
method:"POST",
credentials:"include",
headers:{
"content-type":"application/x-www-form-urlencoded"
},
body:form.toString()
});

location.reload();

}catch(e){
console.error(e);
alert("Ошибка публикации");
}

};

document.querySelectorAll(".vk_old_attach").forEach(b=>{
b.onclick=()=>{
alert("Вложения будут добавлены в версии 3");
};
});

}

ready(()=>{
setInterval(createPostBox,2000);
});

})();