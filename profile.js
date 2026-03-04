'use strict';

const supabaseClient = supabase.createClient(
    'https://kvsnxsttpljqwfbvflbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c254c3R0cGxqcXdmYnZmbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTg5MDQsImV4cCI6MjA4NDY5NDkwNH0.tnLBQyY7X5CrgCkS5Ws6d-igDJiU_fdrjLqCD-KbiMw'
)
const uid = localStorage.getItem('uid')
await supabaseClient
    .from('users')
    .select('*')
    .eq('uid', uid)
    .order('created_at', { ascending: false })
    .then((data) => {
        document.querySelector('.djcsoic3i').addEventListener('click', function(){
            document.querySelectorAll('.asdidoij2icmksdjak2').forEach(e => {
                e.classList.remove('asdidoij2icmksdjak2-active')
                document.querySelector('.djcsoic3i').classList.add('asdidoij2icmksdjak2-active')
                document.querySelector('.asidjoijrioj2rioj4io43jriearth').classList.remove("hide")
                document.querySelector('.sdijoi3oirj32roijewroiewjbbcdic2').classList.add("hide")
            })
        })
        document.querySelector('.djcsoic3i2').addEventListener('click', function(){
            document.querySelectorAll('.asdidoij2icmksdjak2').forEach(e => {
                e.classList.remove('asdidoij2icmksdjak2-active')
                document.querySelector('.djcsoic3i2').classList.add('asdidoij2icmksdjak2-active')
                document.querySelector('.asidjoijrioj2rioj4io43jriearth').classList.add("hide")
                document.querySelector('.sdijoi3oirj32roijewroiewjbbcdic2').classList.remove("hide")
            })
        })
        const dt = data.data[0]
        document.querySelector('.a3ii4jjkdmvskdsddkslakdm4mdcnn').textContent = dt.username
        document.querySelector('.adiji3jrijrioekpop').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ed1c24" viewBox="0 0 256 256"><path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"></path></svg>${dt.aura} aura`
        postsRender(data)
        challengeRender(data.data[0].uid)
        putBio(data.data[0].bio)
        document.querySelector('.cnnabcaura').textContent = `${data.data[0].aura} aura`
        document.querySelector('.sdijoi3j3i4kks').insertAdjacentHTML('afterbegin', `        <img class="profile-nav-pic ekwjelwekeuroep" src="${`${data.data[0].profilePic ? data.data[0].profilePic : 'imgPersonAccNoan.png'}`}" alt="Your profile image"/>`)
    })

async function challengeRender(data) {
    const user = data;
    await supabaseClient
    .from('challenges')
    .select('*')
    .eq('creator_uid', user)
    .order('created_at', { ascending: true })
    .then(data =>{
        const dt = data.data
        const postArray = []        
        dt.forEach(dt => {
            const dtTitle = dt.title
            const classificationChal = dt.classification
            challengePostsRenderBasedClassGetty(classificationChal)
            .then(data => {
                let dtIn = ``
                data.forEach(dt => {
                    dtIn += dt
                })
                document.querySelector('.sdijoi3oirj32roijewroiewjbbcdic2').innerHTML = ``;
                document.querySelector('.sdijoi3oirj32roijewroiewjbbcdic2').insertAdjacentHTML('afterbegin', `
                    <div class="asidjoijrioj2rioj4io43jriearth2">
                            <a href="#" class="idjfoij3oj232ihqplex">${dtTitle}</a>
                            <div class="sdiodjio32i32skibid">
                                ${dtIn}
                            </div>
                    </div>
                `)
            })
        });
    })
}

async function challengePostsRenderBasedClassGetty(chl) {
    let posts = []
    await supabaseClient
    .from('posts')
    .select('*')
    .eq('challengeClassI', chl)
    .order('created_at', { ascending: true })
    .then(data => {
        const dt = data.data
        posts = findRenderDone(dt)
    })
    return posts
}

async function findRenderDone(dt) {
    const posts = []
        for(const dat of dt){
                let postIcon = ''
                if(dat.files.length > 1){
                    postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M200,88V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V88A16,16,0,0,1,40,72H184A16,16,0,0,1,200,88Zm16-48H64a8,8,0,0,0,0,16H216V176a8,8,0,0,0,16,0V56A16,16,0,0,0,216,40Z"></path></svg>`
                }
                else if(dat.files[0].type === 'image'){
                    postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z"></path></svg>`;
                }
                else {
                    postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Zm0-152V168a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-68,56a8,8,0,0,0-3.41-6.55l-40-28A8,8,0,0,0,108,84v56a8,8,0,0,0,12.59,6.55l40-28A8,8,0,0,0,164,112Z"></path></svg>`
                }
                let theAeroText = ''
                if(dat.caption.length > 13){
                theAeroText = dat.caption.substring(0, 13) + '...'
                } else {
                theAeroText = dat.caption
                }
                let orientation = 'width'
                dat.files[0].type === 'image'? orientation = await getImageOrientation(dat.files[0].url) : orientation = await getVideoOrientation(dat.files[0].url)

                posts.push(`
                <div class="sidjasodjaoisdbbcdic">
<div class="sfoiwoifewoijf332re">
    <div class="post-display-img-vid-${orientation} dwergt565trfdcxszzzz" classification="${dat.classification}">
        ${dat.files[0].type === 'video'?`<video class="ahdskajsd" muted loop playsinline>
            <source src="${dat.files[0].url}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`: `<img src="${dat.files[0].url}"/>`}
        <div class="jeifjiewf">
            <!-- <p class="efiwe" wid="100" color="red" bGcolor="blue" ftsize="20" tp="10%" lef="20%" hei="auto"><span class="kds2d">The Bills Are The Best Team In The NFL</span></p> -->
        </div>
        <div class="ewfjioi31111">
            <p class="asjoi3221111 l-433">${postIcon}</p>
            <p class="asjoi3221111 l-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>${dat.likes}</p>
            <p class="asjoi3221111 c-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path></svg>${dat.comments}</p>
        </div>
    </div>
    <p class="sdijoij3ioekmksmokdoky"></p>
</div>
<p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb">${theAeroText}</p>
</div>
`)
        }
        return posts
}

async function putBio(data) {
    if(!data){
        document.querySelector('.disdoiji3ojiofjbito').textContent = 'Bio TBD.'
    } else{
        document.querySelector('.disdoiji3ojiofjbito').textContent = `${data}`
    }
}
function getImageOrientation(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () =>{
      resolve(img.naturalHeight < img.naturalWidth ? 'width' : 'height');
    console.log(img.naturalHeight, img.naturalWidth, url)}
    img.onerror = () => resolve('width') ;
    img.src = url;
});
}
function getVideoOrientation(url) {
  return new Promise(resolve => {
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      resolve(video.videoHeight < video.videoWidth ? 'width' : 'height');
      console.log(video.videoHeight, video.videoWidth, url);
    };
    video.onerror = () => resolve('width');
    video.src = url;
  });
}

async function thePostRender(dt, trueData){
    let posts = []
    let theAeroText = ''
    if(trueData.caption.length > 13){
      theAeroText = trueData.caption.substring(0, 13) + '...'
    } else {
      theAeroText = trueData.caption
    }
    let theAercoText = ''
    if(trueData.challenge.length > 15){
      theAercoText = trueData.challenge.substring(0, 15) + '...'
    } else {
      theAercoText = trueData.challenge
    }
    if(dt.length === 1){
    for (const e of dt) {
    let postIcon = ''
    if(e.type === 'image'){
        postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z"></path></svg>`;
    } else {
        postIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Zm0-152V168a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-68,56a8,8,0,0,0-3.41-6.55l-40-28A8,8,0,0,0,108,84v56a8,8,0,0,0,12.59,6.55l40-28A8,8,0,0,0,164,112Z"></path></svg>`
    }
    let orientation = 'width'
    e.type === 'image'? orientation = await getImageOrientation(e.url) : orientation = await getVideoOrientation(e.url)
    posts.push(`
              <div class="sidjasodjaoisdbbcdic">
                <div class="sfoiwoifewoijf332re">
                    <div class="post-display-img-vid-${orientation} dwergt565trfdcxszzzz" classification="${trueData.classification}">
                        ${e.type === 'video'?`<video class="ahdskajsd" muted loop playsinline>
                            <source src="${e.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`: `<img src="${e.url}"/>`}
                        <div class="jeifjiewf">
                            <!-- <p class="efiwe" wid="100" color="red" bGcolor="blue" ftsize="20" tp="10%" lef="20%" hei="auto"><span class="kds2d">The Bills Are The Best Team In The NFL</span></p> -->
                        </div>
                        <div class="ewfjioi31111">
                            <p class="asjoi3221111 l-433">${postIcon}</p>
                            <p class="asjoi3221111 l-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>${trueData.likes}</p>
                            <p class="asjoi3221111 c-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path></svg>${trueData.comments}</p>
                        </div>
                    </div>
                    <p class="sdijoij3ioekmksmokdoky"></p>
                </div>
                <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb">${theAeroText}</p>
                <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb sdjisojd"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000000" viewBox="0 0 256 256"><path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path></svg>${theAercoText}</p>
            </div>
        `)
    }
} else{
    let postIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 256 256"><path d="M200,88V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V88A16,16,0,0,1,40,72H184A16,16,0,0,1,200,88Zm16-48H64a8,8,0,0,0,0,16H216V176a8,8,0,0,0,16,0V56A16,16,0,0,0,216,40Z"></path></svg>'
    let orientation = 'width'
    dt[0].type === 'image'? orientation = await getImageOrientation(dt[0].url) : orientation = await getVideoOrientation(dt[0].url)
    posts.push(`
              <div class="sidjasodjaoisdbbcdic">
                <div class="sfoiwoifewoijf332re">
                    <div class="post-display-img-vid-${orientation} dwergt565trfdcxszzzz" classification="${trueData.classification}">
                        ${dt[0].type === 'video'?`<video class="ahdskajsd" muted loop playsinline>
                            <source src="3181206-hd_1920_1080_30fps.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`: `<img src="${dt[0].url}"/>`}
                        <div class="jeifjiewf">
                            <!-- <p class="efiwe" wid="100" color="red" bGcolor="blue" ftsize="20" tp="10%" lef="20%" hei="auto"><span class="kds2d">The Bills Are The Best Team In The NFL</span></p> -->
                        </div>
                        <div class="ewfjioi31111">
                            <p class="asjoi3221111 l-433">${postIcon}</p>
                            <p class="asjoi3221111 l-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>${trueData.likes}</p>
                            <p class="asjoi3221111 c-433"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path></svg>${trueData.comments}</p>
                        </div>
                    </div>
                    <p class="sdijoij3ioekmksmokdoky"></p>
                </div>
                <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb">${theAeroText}</p>
                <p class="skiifjoij4ioj45oi43jnvszebracnvmnvnvjdb sdjisojd"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000000" viewBox="0 0 256 256"><path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z"></path></svg>${theAercoText}</p>
            </div>
        `)
}
return posts
}

async function postsRender(postData){
    const dt = postData;
    const uidUser = dt.uid;
    await supabaseClient
    .from('posts')
    .select('*')
    .eq('user_uid', uid)
    .order('created_at', { ascending: true })
    .then((dataa) =>{
        for (const e of dataa.data){
        let files = e.files
        let posts = thePostRender(files, e)
        document.querySelector('.asidjoijrioj2rioj4io43jriearth').innerHTML = '';
        posts.then(r => {
            r.forEach(b => {
            document.querySelector('.asidjoijrioj2rioj4io43jriearth').insertAdjacentHTML('beforeend', `${b}`)
        })});
    }
    })
}
