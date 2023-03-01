const userNameInput = document.getElementById("userName");

const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const reposInfoDiv = document.getElementById("reposInfo");

async function showRepoInfo(userName) {
  const res = await fetch(`https://api.github.com/users/${userName}/repos`);

  const projects = await res.json();
  for (let i = 0; i < projects.length; i++) {
    reposInfoDiv.innerHTML += `
        <div id="reposInfo">
      <div class="card2">
        <div class="card-body2">
          <ol>
          <li>
          <div class="card-title2">${projects[i].name}
          </div>
          
          <div class="card-subHeading2>${projects[i].language}</div>
          <div class="card-text2>
        
          <button id="repobtn">
              <a href=${projects[i].html_url} target="_blank">
              ${projects[i].name}
              </a>
          </button>
            
          </div>
          </li>
          </ol>
        </div>
      </div>

    </div>`;
  }
}
// using async and await...
showDetailsButton.addEventListener("click", async () => {
  const userName = userNameInput.value;

  // request data from server

  const res = await fetch(`https://api.github.com/users/${userName}`);
  const data = await res.json();
  showProfile(data);
  showRepoInfo(userName);
});
function showProfile(data) {
  let un = data?.login;
  profileInfoDiv.innerHTML = `<div id="profileInfo">
        <div class="card">
        <div class="card-img">
          <img src="${data.avatar_url}" alt="${data.name}" >
         </div>
         <div class="card-body">
          <div class="card-title">${data.name}</div>
          
          <div class="card-subHeading>${data.login}</div>
          <div class="card-text>
               <p>${data.bio}</p>
                <p>
                <button type="button" class="btn btn-light">${data.followers} Followers</button> 
                <button type="button" class="btn btn-light">${data.following} Following</button> 
                   <br>
                   <br>
              <button type="button" class="btn btn-primary" id="checkoutProfile" onClick=openProfile("${un}")> Do Checkout Profile</button>
              </p>
          </div>
        </div>
      </div>
     <h1> Repositories </h1>
     <hr class="dotted">
    </div>`;

}



function openProfile(un) {
  let url = `https://github.com/${un}`;
  window.open(url, "_blank");
}
