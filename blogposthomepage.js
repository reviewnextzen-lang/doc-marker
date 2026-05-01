let posts = [];

async function loadPosts(){

  const feed = location.origin + "/feeds/posts/default/-/Blogpost?alt=json&max-results=50";

  try{
    const res = await fetch(feed);
    const data = await res.json();
    posts = data.feed.entry || [];

    render(posts.slice(0, 4)); // ✅ ONLY 4 POSTS

  }catch(e){
    document.getElementById("grid").innerHTML =
    "<p style='text-align:center'>Failed to load posts</p>";
  }
}

/* NEW */
function isNew(i){
  return i < 3;
}

/* RENDER */
function render(items){

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  items.forEach((p,i)=>{

    const title = p.title.$t;
    const link = p.link.find(l=>l.rel==="alternate").href;

    let img = "https://via.placeholder.com/400";

    try {
      let content = p.content?.$t;
      let match = content?.match(/<img[^>]+src="([^">]+)"/);

      if (match && match[1]) {
        img = match[1];
      }

    } catch(e) {}

    grid.innerHTML += `
      <a href="${link}" class="card">

        ${isNew(i) ? `<div class="new-badge">NEW</div>` : ""}

        <div class="img-box">
          <img src="${img}" loading="lazy"/>
        </div>

        <div class="content">
          <div class="label">Blogpost</div>
          <div class="title">${title}</div>

          <div class="read-more-btn" onclick="location.href='${link}'">
            Read More →
          </div>
        </div>

      </a>
    `;
  });
}

loadPosts();
