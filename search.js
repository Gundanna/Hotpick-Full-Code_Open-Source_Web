'use strict';

const supabaseClient = supabase.createClient(
    'https://kvsnxsttpljqwfbvflbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c254c3R0cGxqcXdmYnZmbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTg5MDQsImV4cCI6MjA4NDY5NDkwNH0.tnLBQyY7X5CrgCkS5Ws6d-igDJiU_fdrjLqCD-KbiMw'
  )

async function getAllPosts() {
  const { data, error } = await supabaseClient
    .from('posts')
    .select(`
      id,
      caption,
      challenge,
      user_uid,
      files,
      likes,
      views,
      created_at,
      author,
      comments,
      trophies
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch all posts failed:', error.message)
    return []
  }

  return data
}

async function getAllChallenges() {
  const { data, error } = await supabaseClient
    .from('challenges')
    .select(`
      id,
      title,
      creator_uid,
      upvotes,
      description,
      downvotes,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch all posts failed:', error.message)
    return []
  }

  return data
}

let data1 = [];
let data2 = [];

getAllPosts().then(data => {
    data1 = data;
    searchPostsNow(data1);
})

getAllChallenges().then(data => {
      data2 = data;
      searchChallengesNow(data2);
  })

let searchuery = ''

document.querySelector('.ofiefjoiefjewoifjewoijewfofformsearch').addEventListener('submit', function(event){
    event.preventDefault();
    searchuery = document.querySelector('.fesifjiji3j45').value
    searchPostsNow(data1, searchuery);
    searchChallengesNow(data2, searchuery);
})

function getImageOrientation(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () =>
      resolve(img.naturalHeight > img.naturalWidth ? 'height' : 'width');
    img.onerror = () => resolve('width');
    img.src = url;
  });
}

async function searchPostsNow(data, searchuery = '') {
  const searchQuery = searchuery.toLowerCase();
  const container = document.querySelector('.siij3mdmmkcmdcskibidi');

  container.innerHTML = '';
  const currentPosts = [];

  for (const post of data) {
    const matches =
      searchQuery === '' ||
      post.caption.toLowerCase().includes(searchQuery) ||
      post.challenge.toLowerCase().includes(searchQuery) ||
      post.author.toLowerCase().includes(searchQuery);

    if (!matches) continue;
    if (currentPosts.includes(post.id)) continue;

    currentPosts.push(post.id);
    const orientation = await getImageOrientation(post.files[0].url);
    let theAeroText = ''
    if(post.caption.length > 15){
      theAeroText = post.caption.substring(0, 15) + '...'
    } else {
      theAeroText = post.caption
    }
    let theAercoText = ''
    let postIcon = ''
    if(post.challenge.length > 15){
      theAercoText = post.challenge.substring(0, 15) + '...'
    } else {
      theAercoText = post.challenge
    }
    if(post.files.length > 1){
        postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M200,88V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V88A16,16,0,0,1,40,72H184A16,16,0,0,1,200,88Zm16-48H64a8,8,0,0,0,0,16H216V176a8,8,0,0,0,16,0V56A16,16,0,0,0,216,40Z"></path></svg>`
    }
    else if(post.files[0].type === 'image'){
        postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z"></path></svg>`;
    }
    else {
        postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Zm0-152V168a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-68,56a8,8,0,0,0-3.41-6.55l-40-28A8,8,0,0,0,108,84v56a8,8,0,0,0,12.59,6.55l40-28A8,8,0,0,0,164,112Z"></path></svg>`
    }
    container.insertAdjacentHTML('beforeend', `
<div class="sdjnsjndjsndjncm">
                                            <div class="post-display-img-vid-${orientation} dwergt565trfdcxszzzz">
            <img src="${post.files[0].url}" />
                    <div class="ewfjioi31111">
                        <p class="asjoi3221111 l-433">${postIcon}</p>
                        <p class="asjoi3221111 l-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>${post.likes}</p>
                        <p class="asjoi3221111 c-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path></svg>${post.comments}</p>
                    </div>
</div>
                            <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb" style="margin-top: .6rem;">${theAeroText}</p>
<p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb bbcohno" style="font-size: .7rem;"><svg style="margin-right: .2rem; margin-top: .6rem;" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000000" viewBox="0 0 256 256"><path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path></svg>${theAercoText}</p>
    <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb bbcohno2" style="margin-top: .6rem;">${post.author}</p>
      </div>
    `);
  }
}


async function searchChallengesNow(data, searchuery = '') {
  const searchQuery = searchuery.toLowerCase();
  const container = document.querySelector('.siij3mdmmkcmdcskibidi2');

  container.innerHTML = '';
  const currentChallenges = [];

  for (const challenge of data) {
    const matches =
      searchQuery === '' ||
      challenge.caption.toLowerCase().includes(searchQuery) ||
      challenge.challenge.toLowerCase().includes(searchQuery) ||
      challenge.author.toLowerCase().includes(searchQuery);

    if (!matches) continue;
    if (currentChallenges.includes(challenge.id)) continue;

    currentChallenges.push(challenge.id);
    container.insertAdjacentHTML('beforeend', `
            <div class="sdii3j4kjejefchallengge">
        <p class="dfji3jftitcha">${challenge.title}</p>
        <p class="sdo2ekoewkro3">${challenge.description}</p>
        <div class="sidij2m2mdmdmdate">
          <p class="sdjisjoijfoicreatorcha">${'John Doe'}</p>
          <p class="sdjisjoijfoicreatorctimeha">${challenge.upvotes} upvotes</p>
          <p class="sdjisjoijfoicreatorctimeha">${new Date(challenge.created_at).toISOString().split('T')[0]}</p>
        </div>
      </div>
      `);
  }
}

document.querySelector('.skdoifjiojfijdfioejwfsearchfirefox').addEventListener('click', function(){
    document.querySelector('.sadjdiijroi3jroi4joiyjrnfjnvjfnkj4nzzzzzzzzzzebra').classList.toggle('hide')
})

document.querySelector('main').addEventListener('click', function(){
    document.querySelector('.sadjdiijroi3jroi4joiyjrnfjnvjfnkj4nzzzzzzzzzzebra').classList.add('hide')
})

document.querySelector('.sdjii3ii3mfmfkkkcmmakmmcclaren').addEventListener('click', function(){
    document.querySelector('.sadjdiijroi3jroi4joiyjrnfjnvjfnkj4nzzzzzzzzzzebra').classList.add('hide')
})


document.querySelector('.cvxx2').addEventListener('click', function(){
    document.querySelectorAll('.sdkofofofofoffofofofofofo3kdlfk').forEach(bt => bt.classList.remove('b2bdj'))
    document.querySelector('.cvxx2').classList.toggle('b2bdj')
    document.querySelectorAll('.ijvdijv3dforjs').forEach(el => el.classList.add('hide'))
    document.querySelector('.siij3mdmmkcmdcskibidi').classList.remove('hide')
})
// document.querySelector('.cvxx3').addEventListener('click', function(){
//     document.querySelectorAll('.sdkofofofofoffofofofofofo3kdlfk').forEach(bt => bt.classList.remove('b2bdj'))
//     document.querySelector('.cvxx3').classList.toggle('b2bdj')
//     document.querySelectorAll('.ijvdijv3dforjs').forEach(el => el.classList.add('hide'))
//     document.querySelector('.siij3mdmmkcmdcskibidi').classList.remove('hide')
// })
document.querySelector('.cvxx').addEventListener('click', function(){
    document.querySelectorAll('.sdkofofofofoffofofofofofo3kdlfk').forEach(bt => bt.classList.remove('b2bdj'))
    document.querySelector('.cvxx').classList.toggle('b2bdj')
    document.querySelectorAll('.ijvdijv3dforjs').forEach(el => el.classList.add('hide'))
    document.querySelector('.siij3mdmmkcmdcskibidi2').classList.remove('hide')
})
