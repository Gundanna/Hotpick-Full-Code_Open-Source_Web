'use strict'
const challengeBtn = document.getElementById('challengeBtn')
const challengeInputA = document.getElementById('challenge')
const challengeModal = document.getElementById('challengeModal')
const challengeList = document.getElementById('challengeList')
const challengeSearch = document.getElementById('challengeSearch')
const closeChallengeModal = document.getElementById('closeChallengeModal')

let challenges = [
  'Do something you’ve been avoiding',
  'Film your morning routine',
  '30 seconds of raw honesty',
  'Finish a task in one take',
  'No edits, no filters'
]

challengeBtn.onclick = () => {
  challengeModal.classList.remove('hidden')
  renderChallenges(challenges)
}

closeChallengeModal.onclick = () => {
  challengeModal.classList.add('hidden')
}

challengeSearch.oninput = () => {
  const query = challengeSearch.value.toLowerCase()
  const filtered = challenges.filter(c =>
    c.toLowerCase().includes(query)
  )
  renderChallenges(filtered)
}

function renderChallenges(list) {
  challengeList.innerHTML = ''

  list.forEach(challenge => {
    const item = document.createElement('div')
    item.className = 'challenge-item'
    item.textContent = challenge

    item.onclick = () => {
      challengeInputA.value = challenge
      challengeBtn.textContent = challenge
      challengeModal.classList.add('hidden')
    }
    challengeList.appendChild(item)
  })
}


const mainFileInput = document.getElementById('mainFile')
const filePickerBtn = document.getElementById('filePickerBtn')
const previewGrid = document.getElementById('previewGrid')
const fileInfo = document.getElementById('fileInfo')

filePickerBtn.onclick = () => {
  mainFileInput.click()
}

mainFileInput.onchange = () => {
  const files = Array.from(mainFileInput.files)

  previewGrid.innerHTML = ''

  if (files.length === 0) {
    fileInfo.textContent = 'No files selected'
    return
  }

  fileInfo.textContent =
    files.length === 1
      ? files[0].name
      : `${files.length} files selected`

  files.forEach(file => {
    const previewItem = document.createElement('div')
    previewItem.className = 'preview-item'

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img')
      img.src = URL.createObjectURL(file)
      previewItem.appendChild(img)
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(file)
      video.muted = true
      video.playsInline = true
      video.preload = 'metadata'
      previewItem.appendChild(video)
    }

    previewGrid.appendChild(previewItem)
  })
}

const audioInput = document.getElementById('audioFile')
const audioPickerBtn = document.getElementById('audioPickerBtn')
const audioInfo = document.getElementById('audioInfo')
const audioPreview = document.getElementById('audioPreview')

audioPickerBtn.onclick = () => {
  audioInput.click()
}

audioInput.onchange = () => {
  const file = audioInput.files[0]

  if (!file) {
    audioInfo.textContent = 'No audio selected'
    audioPreview.style.display = 'none'
    return
  }

  audioInfo.textContent = file.name
}


const supabaseClient = supabase.createClient(
    'https://kvsnxsttpljqwfbvflbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c254c3R0cGxqcXdmYnZmbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTg5MDQsImV4cCI6MjA4NDY5NDkwNH0.tnLBQyY7X5CrgCkS5Ws6d-igDJiU_fdrjLqCD-KbiMw'
  )

  const firebaseUID = localStorage.getItem('uid');
  console.log(firebaseUID); 

  const audioFileInput = document.getElementById('audioFile')
  const captionInput = document.getElementById('caption')
  const challengeInput = document.getElementById('challenge')
  const postBtn = document.getElementById('postBtn')

postBtn.onclick = async () => {
  const files = Array.from(mainFileInput.files)
  if (files.length === 0) return 

  const audioFile = audioFileInput.files[0] || null

  const uploadedFiles = []

  for (const file of files) {
    let fileType = ''
    if (file.type.startsWith('image/')) fileType = 'image'
    else if (file.type.startsWith('video/')) fileType = 'video'
    else return alert('Unsupported file type: ' + file.name)

    const filePath = `posts/${Date.now()}-${crypto.randomUUID()}-${file.name}`

    const { error: uploadError } = await supabaseClient.storage
      .from('ALL Posts')
      .upload(filePath, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      return
    }

    const { data } = supabaseClient.storage
      .from('ALL Posts')
      .getPublicUrl(filePath)

    uploadedFiles.push({
      url: data.publicUrl,
      type: fileType
    })
  }

  let audioFileURL = null
  if (audioFile) {
    const audioPath = `posts/audio/${Date.now()}-${audioFile.name}`

    const { error } = await supabaseClient.storage
      .from('ALL Posts')
      .upload(audioPath, audioFile)

    if (error) return alert('Audio upload failed: ' + error.message)

    const { data } = supabaseClient.storage
      .from('ALL Posts')
      .getPublicUrl(audioPath)

    audioFileURL = data.publicUrl
  }
  if(captionInput.value == '') {
    alert('You forgot to add a caption')
    return
  }
  if(challengeInput.value == '') {
    alert('Select a challenge')
    return
  }
  const caption = captionInput.value
  const challenge = challengeInput.value
  let challengeClass = '';
  await supabaseClient
    .from('challenges')
    .select('*')
    .eq('title', challengeInput.value)
    .order('created_at', { ascending: true })
    .then(data =>{
      challengeClass = data.data.classification
    })

  function generateRandomString(length = 30) {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789>%'
    return Array.from({ length }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  }

  const classificationPost = generateRandomString()

  const { error: insertError } = await supabaseClient
    .from('posts')
    .insert([
      {
        files: uploadedFiles, 
        caption,
        challenge,
        song: audioFileURL,
        user_uid: firebaseUID, 
        classification: classificationPost,
        comments: 0,
        likes: 0,
        views: 0,
        trophies: 0,
        author: 'james bradock', // Change to actual name when profile is done
        challengeClassI: challengeClass,
      }
    ])

    function clearUploadForm() {
    const mainFile = document.getElementById('mainFile')
    const fileInfo = document.getElementById('fileInfo')
    const previewGrid = document.getElementById('previewGrid')
    if (mainFile) mainFile.value = ''
    if (fileInfo) fileInfo.textContent = 'No files selected'
    if (previewGrid) previewGrid.innerHTML = ''
    const audioFile = document.getElementById('audioFile')
    const audioInfo = document.getElementById('audioInfo')

    if (audioFile) audioFile.value = ''
    if (audioInfo) audioInfo.textContent = 'No music selected'

    const caption = document.getElementById('caption')
    if (caption) caption.value = ''

    const challengeInput = document.getElementById('challenge')
    if (challengeInput) challengeInput.value = ''

    const challengeModal = document.getElementById('challengeModal')
    if (challengeModal) challengeModal.classList.add('hidden')

    const challengeSearch = document.getElementById('challengeSearch')
    if (challengeSearch) challengeSearch.value = ''

    const challengeList = document.getElementById('challengeList')
    if (challengeList) challengeList.innerHTML = ''
    }

    clearUploadForm()
    getPostsByUser(firebaseUID)
  if (insertError) {
    alert('Post creation failed: ' + insertError.message)
    return
  }

}
async function getPostsByUser(uid) {
  const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('user_uid', uid)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch user posts failed:', error.message)
    return
  }

  if(document.querySelector('.aijsji4mcmvnvkamc').children.length > 1){
    document.querySelector('.jdsisd3nfmnfdszebra').style.display = 'none'
  }

  const container = document.querySelector('.aijsji4mcmvnvkamc')

  data.forEach(post => {
    const postEl = document.createElement('div')
    postEl.className = 'sdijsajidi4ijifjmicrosoftie'
    postEl.dataset.id = post.id
    let theAeroText = ''
    if(post.caption.length > 7){
      theAeroText = post.caption.substring(0, 7) + '...'
    } else {
      theAeroText = post.caption
    }
    postEl.innerHTML = `
      <div class="sii4jmmcnsjejdmckmcveggie">
        <img src="${post.files?.[0]?.url || ''}" />
      </div>

      <p class="saijfmcksmscmskmcdsifi">${theAeroText}</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${post.views || 0} views</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${post.likes || 0} likes</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${post.trophies || 0} trophies</p>

      <div class="zasidji3ncndjdfjsskskskskdjdjsxz">
      <button class="sidj3mvnvjcnv delete-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></button>


    <button class="sidj3mvnvjcnv view-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M176,32c-20.61,0-38.28,18.16-48,45.85C118.28,50.16,100.61,32,80,32c-31.4,0-56,42.17-56,96s24.6,96,56,96c20.61,0,38.28-18.16,48-45.85,9.72,27.69,27.39,45.85,48,45.85,31.4,0,56-42.17,56-96S207.4,32,176,32ZM106.92,186.39C99.43,200.12,89.62,208,80,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32A104.81,104.81,0,0,1,53.08,69.61C60.57,55.88,70.38,48,80,48s19.43,7.88,26.92,21.61C115.35,85.07,120,105.81,120,128S115.35,170.93,106.92,186.39ZM40,128a16,16,0,1,1,16,16A16,16,0,0,1,40,128Zm162.92,58.39C195.43,200.12,185.62,208,176,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32,104.81,104.81,0,0,1,10.24-29.23C156.57,55.88,166.38,48,176,48s19.43,7.88,26.92,21.61C211.35,85.07,216,105.81,216,128S211.35,170.93,202.92,186.39ZM136,128a16,16,0,1,1,16,16A16,16,0,0,1,136,128Z"></path></svg></button>

      </div>
    `

postEl.querySelector('.delete-btn').onclick = async () => {
  const confirmDelete = confirm('Delete this post?')
  if (!confirmDelete) return

  console.log('Deleting post with id:', post.id)

    await supabaseClient
    .from('posts')
    .delete()
    .eq('id', post.id)


  if (error) {
    alert('Delete failed: ' + error.message)
    return
  }

  if (!data || data.length === 0) {
    alert('Nothing was deleted (ID mismatch)')
    return
  }

  postEl.remove()
}

    container.appendChild(postEl)
  })
}


await getPostsByUser(firebaseUID)
const challengeForm = document.getElementById('challengeForm')
const titleInput = document.getElementById('challengeTitle')
const descInput = document.getElementById('challengeDescription')

const mediaInput = document.getElementById('mainFile-2')
const filePickerBtn2 = document.getElementById('filePickerBtn-2')
const fileInfo2 = document.getElementById('fileInfo-2')
const previewGrid2 = document.getElementById('previewGrid-2')

const audioInput2 = document.getElementById('audioFile-2')
const audioPickerBtn2 = document.getElementById('audioPickerBtn-2')
const audioInfo2 = document.getElementById('audioInfo-2')

filePickerBtn2.addEventListener('click', (e) => {
  e.preventDefault() 
  mediaInput.click()
})

mediaInput.addEventListener('change', () => {
  const files = Array.from(mediaInput.files)
  if (files.length === 0) {
    fileInfo2.textContent = 'No files selected'
    previewGrid2.innerHTML = ''
    return
  }

  if (files.length === 1) {
  fileInfo2.textContent = files[0].name
} else {
  fileInfo2.textContent = `${files.length} files selected`
}

  previewGrid2.innerHTML = ''
  files.forEach((file) => {
    const url = URL.createObjectURL(file)
    const div = document.createElement('div')
    div.classList.add('preview-item')

    if (file.type.startsWith('image/')) {
        const img = document.createElement('img')
    img.src = url
      div.appendChild(img)
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video')
    video.src = url
      video.controls = true
      div.appendChild(video)
    }

    previewGrid2.appendChild(div)
  })
})

audioPickerBtn2.addEventListener('click', (e) => {
  e.preventDefault()
  audioInput2.click()
})

audioInput2.addEventListener('change', () => {
  const file = audioInput2.files[0]
  if (!file) {
    audioInfo2.textContent = 'No music selected'
    return
  }
  audioInfo2.textContent = file.name
})

challengeForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const title = titleInput.value.trim()
  const description = descInput.value.trim()

  if (!title || !description) {
    alert('Title and description required')
    return
  }

  let exampleFiles = []
  let exampleAudio = null

  const mediaFiles = Array.from(mediaInput.files || [])
  for (const file of mediaFiles) {
    let type = null
    if (file.type.startsWith('image/')) type = 'image'
    if (file.type.startsWith('video/')) type = 'video'
    if (!type) continue

    const path = `challenges/examples/${crypto.randomUUID()}-${file.name}`
    const { error } = await supabaseClient.storage.from('ALL Posts').upload(path, file)
    if (error) {
      console.error(error)
      alert('Media upload failed')
      return
    }

    const { data } = supabaseClient.storage.from('ALL Posts').getPublicUrl(path)
    exampleFiles.push({ url: data.publicUrl, type })
  }

  const audioFile = audioInput2.files[0]
  if (audioFile) {
    const path = `challenges/audio/${crypto.randomUUID()}-${audioFile.name}`
    const { error } = await supabaseClient.storage.from('ALL Posts').upload(path, audioFile)
    if (error) {
      console.error(error)
      alert('Audio upload failed')
      return
    }

    const { data } = supabaseClient.storage.from('ALL Posts').getPublicUrl(path)
    exampleAudio = data.publicUrl
  }

  const { error: insertError } = await supabaseClient.from('challenges').insert({
    title,
    description,
    example_files: exampleFiles,
    example_audio: exampleAudio,
    creator_uid: firebaseUID,
    classification: generateRandomString(),
    views: 0,
  })
  
  if (insertError) {
    console.error(insertError)
    alert('Challenge creation failed')
    return
  }

  titleInput.value = ''
  descInput.value = ''
  mediaInput.value = ''
  audioInput2.value = ''
  fileInfo2.textContent = 'No files selected'
  audioInfo2.textContent = 'No music selected'
  previewGrid.innerHTML = ''
  getChallengesByUser(firebaseUID)
})

const challengeContainer = document.querySelector('.aijsji4mcmvnvkamc-2')

async function getChallengesByUser(uid) {
  const { data, error } = await supabaseClient
    .from('challenges')
    .select('*')
    .eq('creator_uid', uid)
    .order('created_at', { ascending: false })
    console.log(data)

  if (error) {
    console.error('Fetch user challenges failed:', error.message)
    return
  }

  challengeContainer.querySelectorAll('.challenge-item').forEach(el => el.remove())

  data.forEach(challenge => {
    const item = document.createElement('div')
    item.className = 'sdijsajidi4ijifjmicrosoftie'
    item.dataset.id = challenge.id
    let theJetsonText = ''
    if(challenge.title.length > 7){
      theJetsonText = challenge.title.substring(0, 7) + '...'
    } else {
      theJetsonText = challenge.title
    }
    item.innerHTML = `
      <p class="saijfmcksmscmskmcdsifi">${theJetsonText}</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${challenge.views || 0} views</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${challenge.upvotes || 0} upvotes</p>
      <p class="saijfmcksmscmskmcdsifi kmcmk4m">${challenge.comments || 0} comments</p>

      <div class="zasidji3ncndjdfjsskskskskdjdjsxz">
      <button class="sidj3mvnvjcnv delete-challenge-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></button>


    <button class="sidj3mvnvjcnv view-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M176,32c-20.61,0-38.28,18.16-48,45.85C118.28,50.16,100.61,32,80,32c-31.4,0-56,42.17-56,96s24.6,96,56,96c20.61,0,38.28-18.16,48-45.85,9.72,27.69,27.39,45.85,48,45.85,31.4,0,56-42.17,56-96S207.4,32,176,32ZM106.92,186.39C99.43,200.12,89.62,208,80,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32A104.81,104.81,0,0,1,53.08,69.61C60.57,55.88,70.38,48,80,48s19.43,7.88,26.92,21.61C115.35,85.07,120,105.81,120,128S115.35,170.93,106.92,186.39ZM40,128a16,16,0,1,1,16,16A16,16,0,0,1,40,128Zm162.92,58.39C195.43,200.12,185.62,208,176,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32,104.81,104.81,0,0,1,10.24-29.23C156.57,55.88,166.38,48,176,48s19.43,7.88,26.92,21.61C211.35,85.07,216,105.81,216,128S211.35,170.93,202.92,186.39ZM136,128a16,16,0,1,1,16,16A16,16,0,0,1,136,128Z"></path></svg></button>

      </div>
    `
    item.querySelector('.delete-challenge-btn').onclick = async () => {
      const confirmDelete = confirm('Delete this challenge?')
      if (!confirmDelete) return

      const { data: deletedData, error } = await supabaseClient
        .from('challenges')
        .delete()
        .eq('id', challenge.id)

      if (error) {
        alert('Delete failed: ' + error.message)
        return
      }

      item.remove()
    }

    challengeContainer.appendChild(item)
  })
}

getChallengesByUser(firebaseUID)
console.log(firebaseUID)
