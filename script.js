const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const downloadBtn = document.getElementById("downloadBtn");
const favBtn = document.getElementById("favBtn");
const slideshowBtn = document.getElementById("slideshowBtn");

const images = [

/* colorful animals & birds */
{src:"https://images.unsplash.com/photo-1501706362039-c6e80948bb5b",cat:"animals"}, // peacock
{src:"https://images.unsplash.com/photo-1520808663317-647b476a81b9",cat:"animals"}, // parrot
{src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",cat:"animals"}, // butterfly
{src:"https://images.unsplash.com/photo-1546182990-dffeafbe841d",cat:"animals"}, // macaw
{src:"https://images.unsplash.com/photo-1502082553048-f009c37129b9",cat:"animals"}, // flamingo
{src:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13",cat:"animals"}, // bird
{src:"https://images.unsplash.com/photo-1507149833265-60c372daea22",cat:"animals"}, // dog
{src:"https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",cat:"animals"}, // tiger

/* nature */
{src:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",cat:"nature"},
{src:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",cat:"nature"},
{src:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e",cat:"nature"},
{src:"https://images.unsplash.com/photo-1506744038136-46273834b3fb",cat:"nature"},
{src:"https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",cat:"nature"},
{src:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",cat:"nature"},

/* city */
{src:"https://images.unsplash.com/photo-1494526585095-c41746248156",cat:"city"},
{src:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade",cat:"city"},
{src:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b",cat:"city"},
{src:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",cat:"city"},
{src:"https://images.unsplash.com/photo-1499346030926-9a72daac6c63",cat:"city"},
{src:"https://images.unsplash.com/photo-1505761671935-60b3a7427bad",cat:"city"},

/* art/colors */
{src:"https://images.unsplash.com/photo-1495567720989-cebdbdd97913",cat:"art"},
{src:"https://images.unsplash.com/photo-1504198453319-5ce911bafcde",cat:"art"},
{src:"https://images.unsplash.com/photo-1519681393784-d120267933ba",cat:"art"},
{src:"https://images.unsplash.com/photo-1500534623283-312aade485b7",cat:"art"},
{src:"https://images.unsplash.com/photo-1508612761958-e931da8f6f0b",cat:"art"},
{src:"https://images.unsplash.com/photo-1519125323398-675f0ddb6308",cat:"art"}

];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let filtered = images;
let current = 0;
let slideshow;

function render(){
  gallery.innerHTML="";
  filtered.forEach((img,i)=>{
    const el=document.createElement("img");
    el.src=img.src;
    el.style.animationDelay = i*0.05+"s";
    el.onclick=()=>openLightbox(i);
    gallery.appendChild(el);
  });
}

render();

function filterImages(cat){
  if(cat==="favorites")
    filtered=images.filter(x=>favorites.includes(x.src));
  else if(cat==="all")
    filtered=images;
  else
    filtered=images.filter(x=>x.cat===cat);
  render();
}

function openLightbox(i){
  current=i;
  show();
  lightbox.classList.add("active");
}

function show(){
  lightboxImg.src=filtered[current].src;
  downloadBtn.href=filtered[current].src;
}

function changeImage(step){
  current=(current+step+filtered.length)%filtered.length;
  show();
}

function closeLightbox(){
  lightbox.classList.remove("active");
  stopSlideshow();
}

favBtn.onclick=()=>{
  const src=filtered[current].src;
  if(favorites.includes(src))
    favorites=favorites.filter(x=>x!==src);
  else favorites.push(src);
  localStorage.setItem("favorites",JSON.stringify(favorites));
};

slideshowBtn.onclick=()=>{
  if(slideshow) stopSlideshow();
  else slideshow=setInterval(()=>changeImage(1),2500);
};

function stopSlideshow(){
  clearInterval(slideshow);
  slideshow=null;
}

window.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeLightbox();
  if(e.key==="ArrowRight") changeImage(1);
  if(e.key==="ArrowLeft") changeImage(-1);
});
