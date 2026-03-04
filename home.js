'use strict';
let userInteracted = false;
const _markUserInteracted = () => { userInteracted = true; };
document.addEventListener('click', _markUserInteracted, { passive: true });
document.addEventListener('touchstart', _markUserInteracted, { passive: true });
document.addEventListener('pointerdown', _markUserInteracted, { passive: true });

const supabaseClient = supabase.createClient(
    'https://kvsnxsttpljqwfbvflbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c254c3R0cGxqcXdmYnZmbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTg5MDQsImV4cCI6MjA4NDY5NDkwNH0.tnLBQyY7X5CrgCkS5Ws6d-igDJiU_fdrjLqCD-KbiMw'
  )

class FlaruApp {
    constructor() {
        this.startContinuousHeightCheck();
        this.initInputLabel();
        this.initVideoControls();
        this.initAuthBox();
        this.initAudioPosts();
        this.initImageAudioControls();
        this.applyEfiweAttributes();
        this.enableButtonScrolling();
        this.urlClassificationAdd(); 
        this.slideShow();
        this.likeFunctionality();
    }

    async likeFunctionality(){
        const { data: dataUaser, eraror } = await supabaseClient
        .from('users')
        .select('*')
        .eq('uid', `${uid}`);
        const theLikedPosts = dataUaser[0].like_posts[0].posts
        console.log(theLikedPosts)
    document.querySelectorAll('.jdjn3jdnjclike').forEach(btn =>{
        btn.addEventListener('click', function(event){
            let likedPost = false;
            const clickedBtn = event.currentTarget.closest('.jdjn3jdnjclike2');
            likedPost = clickedBtn.classList.contains('ak-ac')
            clickedBtn.classList.toggle('ak-ac');
            const container = event.currentTarget.closest('.post').getAttribute('classification');
            if(likedPost){
                const index = theLikedPosts.indexOf(container);
                console.log(true)
                if (index !== -1) {
                theLikedPosts.splice(index, 1);
                }                
                console.log(theLikedPosts)
                minusLike(container, clickedBtn)
            } else{
                theLikedPosts.push(`${container}`);
                console.log(theLikedPosts)
                addLike(container, clickedBtn)
            }
            getUpdated(theLikedPosts)
            console.log(theLikedPosts)
        })
    })
    async function getUpdated(theLikedPosts){
const { error: updateError } = await supabaseClient
    .from('users')
    .update({ 
        like_posts: [{"posts": theLikedPosts}]
    })
    .eq('uid', uid); 
    }

    async function addLike(cont, container) {
        let count = parseInt(container.textContent.replaceAll(",", ""), 10) + 1
        const { data, error } = await supabaseClient
        .from('posts')
        .select(`
            likes
        `)
        .eq('classification', cont)
        const countReal = data[0].likes + 1
        const { error: updateError } = await supabaseClient
        .from('posts')
        .update({
            likes: countReal,
        })
        .eq('classification', cont); 

    container.querySelector('.pp3').textContent = `${count.toLocaleString('en-US')}`
    }
    async function minusLike(cont, container) {
        let count = parseInt(container.textContent.replaceAll(",", ""), 10) -1
        const { data, error } = await supabaseClient
        .from('posts')
        .select(`
            likes
        `)
        .eq('classification', cont)
        const countReal = data[0].likes - 1
        const { error: updateError } = await supabaseClient
        .from('posts')
        .update({
            likes: countReal,
        })
        .eq('classification', cont); 

    container.querySelector('.pp3').textContent = `${count.toLocaleString('en-US')}`
    }
}

    urlClassificationAdd() {
        const posts = document.querySelectorAll('.post');

        // Create the IntersectionObserver
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const classification = entry.target.getAttribute('classification');; // e.g. "32943249"
                
                const url = new URL(window.location.href);
                url.searchParams.set('classification', classification);

                // Update the URL without reloading the page
                window.history.replaceState({}, '', url);
            }
            });
        },
        {
            threshold: 0.5 // Trigger when 50% of the element is visible
        }
        );

        // Observe each post
        posts.forEach(post => {
        observer.observe(post);
        });
    }

startContinuousHeightCheck() {
    setInterval(() => {
        const selectors = ['.fduv', '.kjafkj34', '.dskjf', '.post-display-img-vid-height', '.post-display-img-vid-width', '.quick-start-container', '.post'];
        const widths = {};
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach((el, idx) => {
                widths[`${sel}_${idx}`] = el.offsetWidth;
            });
        });
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach((el, idx) => {
                widths[`${sel}_${idx}`] = el.offsetWidth;
            });
        });
        const documentHeight = document.documentElement.scrollHeight;
        const currentViewportHeight = window.innerHeight;

        if (typeof this.previousViewportHeight === 'undefined') {
            this.previousViewportHeight = currentViewportHeight;
        }


        if (
            currentViewportHeight > this.previousViewportHeight ||
            currentViewportHeight < this.previousViewportHeight ||
            currentViewportHeight === this.previousViewportHeight
        ) {
            const aspectRatio = 0.54602184087;
            const scaleSelectors = [
                '.fduv',
                '.post',
                '.kjafkj34',
                '.post-display-img-vid-width',
                '.dskjf',
                '.post-display-img-vid-height',
                '.quick-start-container'
            ];
            scaleSelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    el.style.width = `${document.querySelector('.post').offsetHeight * aspectRatio}px`;
                });
            });
            // Calculate scale factor based on current viewport height
            const baseHeight = 641; // This should be the height you designed for
            const scaleFactor = currentViewportHeight / baseHeight;
            // document.querySelectorAll('.aek, .dsjfi3').forEach(el => {
            //     el.style.transform = `scale(${scaleFactor})`;
            //     el.style.transformOrigin = 'center';
            //     if (el.classList.contains('aek')) {
            //         const baseMarginBottom = 16; // Adjust this value to your base margin-bottom
            //         el.style.marginBottom = `${baseMarginBottom * scaleFactor}px !important`;
            //     }
            // });

            document.querySelectorAll('.post-text').forEach(el => {
                el.style.transform = `scale(${scaleFactor})`;
                el.style.transformOrigin = 'bottom left'; // Adjust this as needed
            });

document.querySelectorAll('.video-controls').forEach(el => {
    el.style.transform = `scale(${scaleFactor})`;
    
    el.style.top = '2%';
    el.style.left = '4.2%';
    
    // el.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    
    el.style.transformOrigin = 'top left';
});

document.querySelectorAll('.audio-controls').forEach(el => {
    // Scale the size
    el.style.transform = `scale(${scaleFactor})`;
    
    // Set the position to top: 2% and left: 4.2%
    el.style.top = '2%';
    el.style.left = '22.2%';
    
    // Remove the centering transform
    // el.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    
    // Adjust the transform origin to top left
    el.style.transformOrigin = 'top left';
});
document.querySelectorAll('.ijdsofjosdf').forEach(el => {
    // Scale the size
    el.style.transform = `scale(${scaleFactor})`;
    
    // Set the position to top: 2% and left: 4.2%
    el.style.top = '2%';
    el.style.left = '4.2%';
    
    // Remove the centering transform
    // el.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    
    // Adjust the transform origin to top left
    el.style.transformOrigin = 'top left';
});


            
            document.querySelectorAll('.post-challenge').forEach(el => {
                el.style.marginBottom = `17.040px !important`;
            });
        }
        const baseMarginLeft = 13.6; 
        const baseHeight = 641;
        const currentHeight = window.innerHeight; 
        const scaledMarginLeft = baseMarginLeft * (currentHeight / baseHeight);

        document.querySelectorAll('.dsjfodsijf').forEach(el => {
            el.style.transform = `translate(${(document.querySelector('.post').offsetWidth)/2 + 40}px)`
        })
        document.querySelectorAll('.saoidasda').forEach(el => {
            el.style.width = `${document.querySelector('.post').offsetWidth}px`;
        })

        document.querySelectorAll('.video-wrapper').forEach(el => {
            el.style.width = `${document.querySelector('.fduv').offsetWidth}px`
        });
        
        const baseMarginLefta = -13.28; 
        const baseWidth = 349.5; 
        const baseHeighta = 288; 
        const basePostHeight = 641; 
        const scale = window.innerHeight / basePostHeight;

        const scaleb = window.innerHeight / baseHeight;

        const baseWidthc = 37;
        const baseMarginLeftc = -0.2; 
        const baseMarginBottomc = 0.34; 
        const scalec = currentHeight / baseHeight;
        const widthSub = baseWidthc * scalec;
        let pubWidthC = 0
        if(document.querySelector('.fduv')){
            pubWidthC = document.querySelector('.fduv').offsetWidth - widthSub;
        } else{ return}
        if(document.querySelectorAll('.video-progress')){
        document.querySelectorAll('.video-progress').forEach(el => {
        el.style.width = `${pubWidthC}px`;
        el.style.marginBottom = `${baseMarginBottomc * scalec}px`;
        });} else return
        const baseJeifWidth = 350; 
        const baseJeifHeight = 640;
        const baseJeifTop = 0.5 * 16; 
        const baseJeifLeft = 0.5 * 16; 
        document.querySelectorAll('.jeifjiewf').forEach(el => {
          const parentWidth = el.parentElement ? el.parentElement.offsetWidth : 0;
          const parentHeight = el.parentElement ? el.parentElement.offsetHeight : 0;
          const jeifWidth = baseJeifWidth * scalec;
          const jeifHeight = baseJeifHeight * scalec;
          el.style.width = `${jeifWidth}px`;
          el.style.height = `${jeifHeight}px`;
          el.style.position = 'absolute';
          if (parentWidth > 0) {
            el.style.left = `${(parentWidth - jeifWidth) / 2}px`;
          }
          if (parentHeight > 0) {
            el.style.top = `${(parentHeight - jeifHeight) / 2}px`;
          }
        });
        const baseFontSize = 16;
        // document.querySelectorAll('.efiwe').forEach(el => {
        //     el.style.fontSize = `${baseFontSize * scale}px`;
        // });
        this.previousViewportHeight = currentViewportHeight;
    }, 1);
}

    initInputLabel() {
        const inputField = document.querySelector('.jroiejf');
        const label = document.querySelector('.kjsadkasd');
        if (!inputField || !label) return;

        inputField.addEventListener('focus', () => {
            inputField.style.padding = '8.5px 0.75rem';
            inputField.style.paddingTop = '1.8rem';
            label.style.display = 'block';
            label.style.color = '#ed1c24';
            inputField.placeholder = '';
        });

        inputField.addEventListener('blur', () => {
            if (inputField.value.trim() !== '') {
                label.style.color = '#636363';
            } else {
                inputField.style.padding = '18.65px 0.75rem';
                label.style.display = 'none';
                inputField.placeholder = 'Email or phone number';
            }
        });

        label.addEventListener('mousedown', (event) => {
            event.preventDefault();
            inputField.focus();
        });

        inputField.focus();
    }

    initVideoControls() {
        const arnavGoated = document.querySelector('.aisjj4mmmckkmcdockkburger');
        if (!arnavGoated) return;
        arnavGoated.addEventListener('mouseenter', () => {
            arnavGoated.style.opacity = '1';
        });
        arnavGoated.style.transition = 'opacity 0.3s';
        document.querySelectorAll(
        '.post-display-img-vid-height, .post-display-img-vid-width'
        ).forEach(container => {
        container.addEventListener('mouseenter', () => {
            arnavGoated.style.opacity = '1';
        });
        container.addEventListener('mouseleave', () => {
            arnavGoated.style.opacity = '0';
        });
        });
        const audioControls = document.querySelector('.audio-controls');
        const videoControls = document.querySelector('.video-controls');
        const fduvContainer = document.querySelector('.fduv');
        if (!audioControls || !videoControls || !fduvContainer) return;

        const setControlsOpacity = (focusedElement) => {
            audioControls.style.opacity = '100';
            videoControls.style.opacity = '100';
            if (focusedElement === audioControls) audioControls.focus();
            else if (focusedElement === videoControls) videoControls.focus();
            setTimeout(() => {
                audioControls.style.opacity = '0';
                videoControls.style.opacity = '0';
                audioControls.blur();
                videoControls.blur();
            }, 2000);
        };

        fduvContainer.addEventListener('mousemove', () => {
            audioControls.style.opacity = '100';
            videoControls.style.opacity = '100';
            clearTimeout(audioControls._timeout);
            clearTimeout(videoControls._timeout);
            audioControls._timeout = setTimeout(() => {
                audioControls.style.opacity = '0';
                videoControls.style.opacity = '0';
            }, 2000);
        });

        fduvContainer.addEventListener('mouseleave', () => {
            audioControls.style.opacity = '0';
            videoControls.style.opacity = '0';
        });

        audioControls.addEventListener('focus', () => setControlsOpacity(audioControls));
        videoControls.addEventListener('focus', () => setControlsOpacity(videoControls));
    }

    initAuthBox() {
        const posts = document.querySelectorAll('.fduv');
        const startButton = document.querySelectorAll('.disneyjdf');
        if (!startButton) return;
        posts.forEach((post) => {
            const audioControl = post.querySelector('.audio-controls');
            const videoControls = post.querySelector('.video-controls');
            if (audioControl) audioControl.style.opacity = '0';
            if (videoControls) videoControls.style.opacity = '0';
        });
        startButton.forEach(btn=>btn.addEventListener('click', function(){
            userInteracted = true;
            document.querySelectorAll('.authentication-div').forEach(div => {div.classList.add('hide')});
                document.querySelector('.oifgoj').style.display = 'none';
        }))
        if(userInteracted){
        startButton.forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.authentication-div').forEach(div => {div.classList.add('hide')});
                document.querySelector('.oifgoj').style.display = 'none';

                function updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon) {
                    if (video.paused) {
                        if (playIcon) playIcon.style.display = 'block';
                        if (pauseIcon) pauseIcon.style.display = 'none';
                    } else {
                        if (playIcon) playIcon.style.display = 'none';
                        if (pauseIcon) pauseIcon.style.display = 'block';
                    }
                    if (video.muted) {
                        if (muteIcon) muteIcon.style.display = 'block';
                        if (unmuteIcon) unmuteIcon.style.display = 'none';
                    } else {
                        if (muteIcon) muteIcon.style.display = 'none';
                        if (unmuteIcon) unmuteIcon.style.display = 'block';
                    }
                }

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            const post = entry.target;
                            const video = post.querySelector('video');
                            const playIcon = post.querySelector('.play-icon');
                            const pauseIcon = post.querySelector('.pause-icon');
                            const audioControl = post.querySelector('.audio-controls');
                            const muteIcon = audioControl?.querySelector('.mute-audio-icn');
                            const unmuteIcon = audioControl?.querySelector('.play-audio-icn');

                            if (entry.isIntersecting && !document.hidden) {
                                if (video) {
                                    video.currentTime = 0;
                                    video.muted = !userInteracted;
                                    video.play().catch(() => {});
                                    updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon);
                                }
                            } else {
                                if (video && !document.hidden) {
                                    video.pause();
                                    video.muted = true;
                                    updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon);
                                }
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                posts.forEach((post) => observer.observe(post));

                posts.forEach((post) => {
                    const audioControl = post.querySelector('.audio-controls');
                    const video = post.querySelector('video');
                    const muteIcon = audioControl?.querySelector('.mute-audio-icn');
                    const unmuteIcon = audioControl?.querySelector('.play-audio-icn');
                    if (audioControl && video) {
                        audioControl.addEventListener('click', (event) => {
                            event.stopPropagation();
                            video.muted = !video.muted;
                            updateIcons(video, null, null, muteIcon, unmuteIcon);
                        });
                    }
                });

                posts.forEach((post) => {
                    const videoControls = post.querySelector('.video-controls');
                    const video = post.querySelector('video');
                    const playIcon = post.querySelector('.play-icon');
                    const pauseIcon = post.querySelector('.pause-icon');
                    if (videoControls && video) {
                        videoControls.addEventListener('click', (event) => {
                            event.stopPropagation();
                            if (video.paused) video.play();
                            else video.pause();
                            updateIcons(video, playIcon, pauseIcon, null, null);
                        });
                    }
                });

                posts.forEach((post) => {
                    const video = post.querySelector('video');
                    const playIcon = post.querySelector('.play-icon');
                    const pauseIcon = post.querySelector('.pause-icon');
                    post.addEventListener('click', (event) => {
                        if (
                            event.target.closest('.audio-controls') ||
                            event.target.closest('.ksdjfjiudsf') ||
                            event.target.closest('.post-challenge')
                        ) {
                            return;
                        }
                        if (video.paused) video.play();
                        else video.pause();
                        updateIcons(video, playIcon, pauseIcon, null, null);
                    });
                });

                posts.forEach((post) => {
                    const video = post.querySelector('video');
                    const progressBar = post.querySelector('.video-progress-bar');
                    const progressContainer = post.querySelector('.video-progress');
                    if (video && progressBar && progressContainer) {
                        video.addEventListener('timeupdate', () => {
                            if (video.duration && !isNaN(video.duration)) {
                                const progress = (video.currentTime / video.duration) * 100;
                                progressBar.style.width = `${progress}%`;
                            }
                        });

                        let isDragging = false;
                        const seekVideo = (event) => {
                            const rect = progressContainer.getBoundingClientRect();
                            const clickPosition = event.clientX - rect.left;
                            const clickPercentage = Math.max(0, Math.min((clickPosition / rect.width) * 100, 100));
                            const seekTime = (clickPercentage / 100) * video.duration;
                            video.currentTime = seekTime;
                            progressBar.style.width = `${clickPercentage}%`;
                        };

                        progressContainer.addEventListener('mousedown', (event) => {
                            isDragging = true;
                            seekVideo(event);
                            video.pause();
                        });

                        document.addEventListener('mousemove', (event) => {
                            if (isDragging) seekVideo(event);
                        });

                        document.addEventListener('mouseup', () => {
                            if (isDragging) {
                                isDragging = false;
                                video.play();
                            }
                        });

                        progressContainer.addEventListener('dragstart', (event) => {
                            event.preventDefault();
                        });
                    }
                });

                const fduvContainer = document.querySelector('.fduv');
                if(!fduvContainer) return;
                const video = fduvContainer.querySelector('video')
                posts.forEach((post) => {
                    const audioControl = post.querySelector('.audio-controls');
                    const videoControls = post.querySelector('.video-controls');
                    let hideControlsTimeout;
                    const showControls = () => {
                        if (audioControl) audioControl.style.opacity = '1';
                        if (videoControls) videoControls.style.opacity = '1';
                        clearTimeout(hideControlsTimeout);
                    };
                    const hideControls = () => {
                        hideControlsTimeout = setTimeout(() => {
                                if (audioControl) audioControl.style.opacity = '0';
                                if (videoControls) videoControls.style.opacity = '0';
                        }, 2000);
                    };
                    post.addEventListener('mousemove', () => {
                        showControls();
                        hideControls();
                    });
                    post.addEventListener('mouseleave', () => {
                        if (audioControl) audioControl.style.opacity = '0';
                        if (videoControls) videoControls.style.opacity = '0';
                        clearTimeout(hideControlsTimeout);
                    });
                    if (audioControl) audioControl.style.opacity = '0';
                    if (videoControls) videoControls.style.opacity = '0';
                    clearTimeout(hideControlsTimeout);
                });
                if (audioControl) audioControl.style.opacity = '0';
                if (videoControls) videoControls.style.opacity = '0';
            });
        })}
        else{
            // No user interaction yet: same logic but videos start muted
            const posts = document.querySelectorAll('.fduv');
            
            function updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon) {
                if (video.paused) {
                    if (playIcon) playIcon.style.display = 'block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                } else {
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'block';
                }
                if (video.muted) {
                    if (muteIcon) muteIcon.style.display = 'block';
                    if (unmuteIcon) unmuteIcon.style.display = 'none';
                } else {
                    if (muteIcon) muteIcon.style.display = 'none';
                    if (unmuteIcon) unmuteIcon.style.display = 'block';
                }
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const post = entry.target;
                        const video = post.querySelector('video');
                        const playIcon = post.querySelector('.play-icon');
                        const pauseIcon = post.querySelector('.pause-icon');
                        const audioControl = post.querySelector('.audio-controls');
                        const muteIcon = audioControl?.querySelector('.mute-audio-icn');
                        const unmuteIcon = audioControl?.querySelector('.play-audio-icn');

                        if (entry.isIntersecting && !document.hidden) {
                            if (video) {
                                video.currentTime = 0;
                                video.muted = !userInteracted;
                                video.play().catch(() => {});
                                updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon);
                            }
                        } else {
                            if (video && !document.hidden) {
                                video.pause();
                                video.muted = true;
                                updateIcons(video, playIcon, pauseIcon, muteIcon, unmuteIcon);
                            }
                        }
                    });
                },
                { threshold: 0.5 }
            );

            posts.forEach((post) => observer.observe(post));

            posts.forEach((post) => {
                const audioControl = post.querySelector('.audio-controls');
                const video = post.querySelector('video');
                const muteIcon = audioControl?.querySelector('.mute-audio-icn');
                const unmuteIcon = audioControl?.querySelector('.play-audio-icn');
                if (audioControl && video) {
                    audioControl.addEventListener('click', (event) => {
                        event.stopPropagation();
                        video.muted = !video.muted;
                        updateIcons(video, null, null, muteIcon, unmuteIcon);
                    });
                }
            });

            posts.forEach((post) => {
                const videoControls = post.querySelector('.video-controls');
                const video = post.querySelector('video');
                const playIcon = post.querySelector('.play-icon');
                const pauseIcon = post.querySelector('.pause-icon');
                if (videoControls && video) {
                    videoControls.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if (video.paused) video.play();
                        else video.pause();
                        updateIcons(video, playIcon, pauseIcon, null, null);
                    });
                }
            });

            posts.forEach((post) => {
                const video = post.querySelector('video');
                const playIcon = post.querySelector('.play-icon');
                const pauseIcon = post.querySelector('.pause-icon');
                post.addEventListener('click', (event) => {
                    if (
                        event.target.closest('.audio-controls') ||
                        event.target.closest('.ksdjfjiudsf') ||
                        event.target.closest('.post-challenge')
                    ) {
                        return;
                    }
                    if (video.paused) video.play();
                    else video.pause();
                    updateIcons(video, playIcon, pauseIcon, null, null);
                });
            });

            posts.forEach((post) => {
                const video = post.querySelector('video');
                const progressBar = post.querySelector('.video-progress-bar');
                const progressContainer = post.querySelector('.video-progress');
                if (video && progressBar && progressContainer) {
                    video.addEventListener('timeupdate', () => {
                        if (video.duration && !isNaN(video.duration)) {
                            const progress = (video.currentTime / video.duration) * 100;
                            progressBar.style.width = `${progress}%`;
                        }
                    });

                    let isDragging = false;
                    const seekVideo = (event) => {
                        const rect = progressContainer.getBoundingClientRect();
                        const clickPosition = event.clientX - rect.left;
                        const clickPercentage = Math.max(0, Math.min((clickPosition / rect.width) * 100, 100));
                        const seekTime = (clickPercentage / 100) * video.duration;
                        video.currentTime = seekTime;
                        progressBar.style.width = `${clickPercentage}%`;
                    };

                    progressContainer.addEventListener('mousedown', (event) => {
                        isDragging = true;
                        seekVideo(event);
                        video.pause();
                    });

                    document.addEventListener('mousemove', (event) => {
                        if (isDragging) seekVideo(event);
                    });

                    document.addEventListener('mouseup', () => {
                        if (isDragging) {
                            isDragging = false;
                            video.play();
                        }
                    });

                    progressContainer.addEventListener('dragstart', (event) => {
                        event.preventDefault();
                    });
                }
            });

            const fduvContainer = document.querySelector('.fduv');
            if(!fduvContainer) return;
            const video = fduvContainer.querySelector('video')
            posts.forEach((post) => {
                const audioControl = post.querySelector('.audio-controls');
                const videoControls = post.querySelector('.video-controls');
                let hideControlsTimeout;
                const showControls = () => {
                    if (audioControl) audioControl.style.opacity = '1';
                    if (videoControls) videoControls.style.opacity = '1';
                    clearTimeout(hideControlsTimeout);
                };
                const hideControls = () => {
                    hideControlsTimeout = setTimeout(() => {
                            if (audioControl) audioControl.style.opacity = '0';
                            if (videoControls) videoControls.style.opacity = '0';
                    }, 2000);
                };
                post.addEventListener('mousemove', () => {
                    showControls();
                    hideControls();
                });
                post.addEventListener('mouseleave', () => {
                    if (audioControl) audioControl.style.opacity = '0';
                    if (videoControls) videoControls.style.opacity = '0';
                    clearTimeout(hideControlsTimeout);
                });
                if (audioControl) audioControl.style.opacity = '0';
                if (videoControls) videoControls.style.opacity = '0';
                clearTimeout(hideControlsTimeout);
            });
        }
    }


    initAudioPosts() {
        const audioPosts = document.querySelectorAll('#ewroiwjr');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const post = entry.target;
                const audio = post.querySelector('audio');
                const muteBtn = post.querySelector('.ijdsofjosdf');
                const muteIcon = muteBtn?.querySelector('.mute-audio-icn');
                const unmuteIcon = muteBtn?.querySelector('.play-audio-icn');
                if (!audio) return;

                if (entry.isIntersecting) {
                    audio.currentTime = 0;
                    audio.muted = !userInteracted;
                    audio.loop = true;
                    audio.play();
                    if (muteIcon && unmuteIcon) {
                        muteIcon.style.display = audio.muted ? 'block' : 'none';
                        unmuteIcon.style.display = audio.muted ? 'none' : 'block';
                    }
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        }, { threshold: 0.5 });

        audioPosts.forEach(post => observer.observe(post));

        audioPosts.forEach(post => {
            const audio = post.querySelector('audio');
            const muteBtn = post.querySelector('.ijdsofjosdf');
            const muteIcon = muteBtn?.querySelector('.mute-audio-icn');
            const unmuteIcon = muteBtn?.querySelector('.play-audio-icn');
            let focusTimeout;
            if (!audio || !muteBtn) return;

            if (muteIcon && unmuteIcon) {
                muteIcon.style.display = audio.muted ? 'block' : 'none';
                unmuteIcon.style.display = audio.muted ? 'none' : 'block';
            }

            muteBtn.addEventListener('click', () => {
                audio.muted = !audio.muted;
                if (muteIcon && unmuteIcon) {
                    muteIcon.style.display = audio.muted ? 'block' : 'none';
                    unmuteIcon.style.display = audio.muted ? 'none' : 'block';
                }
                muteBtn.focus();
                clearTimeout(focusTimeout);
                focusTimeout = setTimeout(() => {
                    muteBtn.blur();
                }, 2000);
            });

            muteBtn.addEventListener('focus', () => {
                clearTimeout(focusTimeout);
                focusTimeout = setTimeout(() => {
                    muteBtn.blur();
                }, 2000);
            });
        });
    }

    initImageAudioControls() {
        document.querySelectorAll('.dskjf').forEach((post) => {
            const sf = post.querySelector('.ijdsofjosdf');
            let hideControlsTimeout;
            const showControls = () => {
                if (sf) sf.style.opacity = '1';
                clearTimeout(hideControlsTimeout);
            };
            const hideControls = () => {
                hideControlsTimeout = setTimeout(() => {
                    if (sf) sf.style.opacity = '0';
                }, 2000);
            };
            post.addEventListener('mousemove', () => {
                showControls();
                hideControls();
            });
            post.addEventListener('mouseleave', () => {
                if (sf) sf.style.opacity = '0';
                clearTimeout(hideControlsTimeout);
            });
            if (sf) sf.style.opacity = '0';
        });
    }

    applyEfiweAttributes() {
        // document.querySelectorAll('.efiwe').forEach(el => {
        //     if (el.hasAttribute('color')) el.style.color = el.getAttribute('color');
        //     if (el.hasAttribute('bGcolor')) el.style.backgroundColor = el.getAttribute('bGcolor');
        //     if (el.hasAttribute('ftsize')) el.style.fontSize = el.getAttribute('ftsize');
        //     if (el.hasAttribute('wid')) el.style.width = el.getAttribute('wid');
        //     if (el.hasAttribute('tp')) el.style.top = el.getAttribute('tp');
        //     if (el.hasAttribute('lef')) el.style.left = el.getAttribute('lef');
        //     if (el.hasAttribute('hei')) el.style.height = el.getAttribute('hei');
        // });
    }

    slideShow(){
        
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
    console.log(slideIndex)
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("isdjijrijtradobecomibnator");
    if(slides.length === 0) return;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}

document.querySelectorAll('.dfijfijvmountaindew').forEach(b=>{b.addEventListener('click', function(){
    plusSlides(1);
})})
    }

    enableButtonScrolling() {
        const posts = Array.from(document.querySelectorAll('.post'));
        console.log(true)
        const upBtn = document.querySelector('.oiwejfoi24332raaaaaaa');
        const downBtn = document.querySelector('.uihvsiuer');
        if (!upBtn || !downBtn || posts.length === 0) return;

        let currentIndex = 0;
        let lastIndex = -1;
        let scrollTimeout;

        const updateCurrentIndex = () => {
            let closest = 0;
            let minDiff = Infinity;
            posts.forEach((post, i) => {
                const rect = post.getBoundingClientRect();
                const diff = Math.abs(rect.top);
                if (diff < minDiff) {
                    minDiff = diff;
                    closest = i;
                }
            });
            currentIndex = closest;

            if (currentIndex === 0) {
                upBtn.style.display = 'none';
            } else {
                upBtn.style.display = '';
            }
            if (currentIndex === posts.length - 1) {
                downBtn.style.display = 'none';
            } else {
                downBtn.style.display = '';
            }

            if (currentIndex !== lastIndex) {
                lastIndex = currentIndex;
            }
        };

        const delayedUpdate = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateCurrentIndex, 80);
        };

        window.addEventListener('scroll', delayedUpdate, { passive: true });
        window.addEventListener('wheel', delayedUpdate, { passive: true });
        window.addEventListener('resize', updateCurrentIndex);

        const postsContainer = document.querySelector('.posts');
        if (postsContainer) {
            postsContainer.addEventListener('touchend', updateCurrentIndex, { passive: true });
            postsContainer.addEventListener('touchmove', delayedUpdate, { passive: true });
            postsContainer.addEventListener('transitionend', updateCurrentIndex, { passive: true });
        }

        upBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                posts[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(updateCurrentIndex, 400);
            }
        });

        downBtn.addEventListener('click', () => {
            if (currentIndex < posts.length - 1) {
                posts[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(updateCurrentIndex, 400);
            }
        });

        updateCurrentIndex();
    }
    changeOrientation(event){
        event.preventDefault();
    }
}

async function getAllPosts2() {
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
      song,
      classification,
      trophies
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch all posts failed:', error.message)
    return []
  }

  return data
}

function getImageOrientation(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () =>
      resolve(img.naturalHeight > img.naturalWidth ? 'height' : 'width');
    img.onerror = () => resolve('width');
    img.src = url;
  });
}

function linkifyTags(text) {
  return text.replace(/([#@][a-zA-Z0-9_]+)/g, (match) => {
    return `<a href="#" class="hastags-post">${match}</a>`
  })
}

async function postRender(){
    document.querySelector('.posts').innerHTML = ''
    getAllPosts2().then(async data =>{
        console.log(data)
        for (const dt of data){
        let ptDes = `${dt.caption}`;
        let ptDesReal;
        if (ptDes.length > 100) {
        ptDes = ptDes.slice(0, 100)
        ptDesReal =
            linkifyTags(ptDes) +
            '... <button href="#" class="see-more-btn">more</button>';
        } else {
        ptDesReal = linkifyTags(ptDes)
        }
        const { data: dataUser, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('uid', "Z229uehMebUVCeeSOZjlwqDaAcv2");
        let username = dataUser[0].username
        const { data: dataUaser, eraror } = await supabaseClient
        .from('users')
        .select('*')
        .eq('uid', `${uid}`);
        let likesPosts = dataUaser[0].like_posts[0].posts
            if(dt.files.length === 1){
                console.log(dt.song)
                const orientation = await getImageOrientation(dt.files[0].url);
                document.querySelector('.posts').insertAdjacentHTML(`beforeend`, `
                    <div class="post ijfj4mskdnjadobe" id="ewroiwjr" classification="${dt.classification}">
            <div class="${dt.files[0].type === 'image' ? `dskjf` : `fduv`}">
            <div class="post-display-img-vid-${orientation} ijtroigjtroihjtroihj">
                ${dt.files[0].type === 'image' ? `<img src="${dt.files[0].url}" />` : `
                                    <video class="ahdskajsd" muted loop playsinline>
                        <source src="${dt.files[0].url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button class="video-controls" onclick="togglePlayPause(this)">
                        <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" style="display: none;" width="20" height="20" fill="white" viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
                        <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256"><path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path></svg>
                    </button>
                                        <button class="audio-controls">
                        <svg class="play-audio-icn" style="display: block;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                            <path d="M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"></path>
                        </svg>
                        <svg class="mute-audio-icn" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                            <path d="M213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09v48.6a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.55-51A4,4,0,0,1,80,176.18V87.09L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-27.21-55.46a8,8,0,0,0,11.29-.7,40,40,0,0,0,0-52.88,8,8,0,1,0-12,10.57,24,24,0,0,1,0,31.72A8,8,0,0,0,186.71,155.16Zm40.92-80.49a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66ZM153,119.87a4,4,0,0,0,7-2.7V32.25a8.27,8.27,0,0,0-2.88-6.4,8,8,0,0,0-10-.16L103.83,59.33a4,4,0,0,0-.5,5.85ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Z"></path>
                        </svg>
                    </button>`}
                <!-- Add isdfjoi class style for audio media query -->
                ${dt.song ?  
                    `                <audio class="akjsd" muted loop>
                    <source src="${dt.song}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                <button class="ijdsofjosdf">
                    <!-- Add w21e styles in phone media query(Dont use class just add styles in the media query) -->
                    <svg class="play-audio-icn" style="display: block;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                        <path d="M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"></path>
                    </svg>
                    <svg class="mute-audio-icn" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                        <path d="M213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09v48.6a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.55-51A4,4,0,0,1,80,176.18V87.09L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-27.21-55.46a8,8,0,0,0,11.29-.7,40,40,0,0,0,0-52.88,8,8,0,1,0-12,10.57,24,24,0,0,1,0,31.72A8,8,0,0,0,186.71,155.16Zm40.92-80.49a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66ZM153,119.87a4,4,0,0,0,7-2.7V32.25a8.27,8.27,0,0,0-2.88-6.4,8,8,0,0,0-10-.16L103.83,59.33a4,4,0,0,0-.5,5.85ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Z"></path>
                    </svg>
                </button>` : ''
                }
            </div>
            ${dt.files[0].type === 'image' ? `
                                <div class="post-text">
                    <div class="ksdjfa a9trg">
                        <a class="post-creater" href="#"><div class="sprorterprofile"><img class="eiej3i" src="Ronaldo-Champions-league-Manchester-United.webp" /></div>${username}</a>
                        <button class="ksdjf ksdjfjiudsf">Follow</button>
                    </div>                    
                    <p class="post-description a9trg">${ptDesReal}</p>
                    <a href="#" class="post-challenge g228ufdi a9trg"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fffafa" viewBox="0 0 256 256"><path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"></path></svg>${dt.challenge}</a>
                </div>` : `
                            <div class="knjkhyfhgj">
<div class="post-text">
                    <div class="ksdjfa a9trg">
                        <a class="post-creater" href="#"><div class="sprorterprofile"><img class="eiej3i" src="Ronaldo-Champions-league-Manchester-United.webp" /></div>${username}</a>
                        <button class="ksdjf ksdjfjiudsf">Follow</button>
                    </div>                    
                    <p class="post-description a9trg">${ptDesReal}</p>
                    <a href="#" class="post-challenge g228ufdi a9trg"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fffafa" viewBox="0 0 256 256"><path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"></path></svg>${dt.challenge}</a>
                </div>
            <div class="video-wrapper">
                <div class="video-progress">
                    <div class="video-progress-bar"></div>
                </div>
            </div>
            </div>
                `}

                <div class="saoidasda"></div>
            </div>
            <ul class="dsjfodsijf">
                <li class="aek  "><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg></button>20,001</li>
                ${likesPosts.includes(`${dt.classification}`) ? `<li class="aek ak-ac jdjn3jdnjclike2"><button class="ak jdjn3jdnjclike"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg></button><span class="pp3">${dt.likes.toLocaleString('en-US')}</span></li>` : `                <li class="aek  jdjn3jdnjclike2"><button class="ak jdjn3jdnjclike"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg></button><span class="pp3">${dt.likes.toLocaleString('en-US')}</span></li>`}
                <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path></svg></button>7,000</li>
                <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg></button></li>
                <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M237.66,117.66l-80,80A8,8,0,0,1,144,192V152.23c-57.1,3.24-96.25,40.27-107.24,52h0a12,12,0,0,1-20.68-9.58c3.71-32.26,21.38-63.29,49.76-87.37,23.57-20,52.22-32.69,78.16-34.91V32a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,237.66,117.66Z"></path></svg></button></li>
                <li class="dsjfi3"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z"></path></svg></button></li>
            </ul>
        </div>
                    `)
            } else {
                let postsMultiCont = []
                console.log('gss')
                for (const dtFiles of dt.files) {
                    const orientation = await getImageOrientation(dtFiles.url);
                    if(dtFiles.type === 'video'){
                    const postThingy = `
                    <div class="fduv isdjijrijtradobecomibnator">
            <div class="sji4mckvktrejti4jlistyoutube">
                <div class="post-display-img-vid-${orientation}">
                    <video class="ahdskajsd" muted loop playsinline>
                        <source src="${dtFiles.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button class="video-controls" onclick="togglePlayPause(this)">
                        <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" style="display: none;" width="20" height="20" fill="white" viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
                        <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256"><path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path></svg>
                    </button>
                    <button class="audio-controls">
                        <svg class="play-audio-icn" style="display: block;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                            <path d="M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"></path>
                        </svg>
                        <svg class="mute-audio-icn" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                            <path d="M213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09v48.6a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.55-51A4,4,0,0,1,80,176.18V87.09L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-27.21-55.46a8,8,0,0,0,11.29-.7,40,40,0,0,0,0-52.88,8,8,0,1,0-12,10.57,24,24,0,0,1,0,31.72A8,8,0,0,0,186.71,155.16Zm40.92-80.49a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66ZM153,119.87a4,4,0,0,0,7-2.7V32.25a8.27,8.27,0,0,0-2.88-6.4,8,8,0,0,0-10-.16L103.83,59.33a4,4,0,0,0-.5,5.85ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Z"></path>
                        </svg>
                    </button>
                    <!-- Check if video has sound before adding audio-controls to video based post -->
                    <!-- Add w21e styles in phone media query(Dont use class just add styles in the media query) -->
                </div>
            </div>
            <div class="knjkhyfhgj">
            <div class="post-text ijoisjd">
                    <div class="ksdjfa a9trg">
                        <a class="post-creater" href="#"><div class="sprorterprofile"><img class="eiej3i" src="Ronaldo-Champions-league-Manchester-United.webp" /></div>${dt.author}</a>
                        <button class="ksdjfjiudsf ksdjf">Follow</button>
                    </div>
                    <p class="post-description a9trg">${ptDesReal}</p>
                    <a href="#" class="post-challenge g228ufdi a9trg"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fffafa" viewBox="0 0 256 256"><path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"></path></svg>${dt.challenge}</a>
            </div>
            <div class="video-wrapper">
                <div class="video-progress">
                    <div class="video-progress-bar"></div>
                </div>
            </div>
            </div>
            <div class="jeifjiewf">
                <!-- <p class="efiwe" wid="100px" color="red" bGcolor="blue" ftsize="20px" tp="10%" lef="20%" hei="auto"><span class="kds2d">The Bills Are The Best Team In The NFL</span></p> -->
            </div>
            <div class="saoidasda"></div>
            </div>`
                postsMultiCont.push(postThingy)
                } else{
                    const postThingy = `
            <div class="dskjf isdjijrijtradobecomibnator">
            <div class="post-display-img-vid-height ijtroigjtroihjtroihj">
                <img src="${dtFiles.url}" />
                <!-- Add isdfjoi class style for audio media query -->
                ${dt.song ?  
                    `                <audio class="akjsd" muted loop>
                    <source src="${dt.song}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                <button class="ijdsofjosdf">
                    <!-- Add w21e styles in phone media query(Dont use class just add styles in the media query) -->
                    <svg class="play-audio-icn" style="display: block;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                        <path d="M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"></path>
                    </svg>
                    <svg class="mute-audio-icn" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256">
                        <path d="M213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09v48.6a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.55-51A4,4,0,0,1,80,176.18V87.09L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-27.21-55.46a8,8,0,0,0,11.29-.7,40,40,0,0,0,0-52.88,8,8,0,1,0-12,10.57,24,24,0,0,1,0,31.72A8,8,0,0,0,186.71,155.16Zm40.92-80.49a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66ZM153,119.87a4,4,0,0,0,7-2.7V32.25a8.27,8.27,0,0,0-2.88-6.4,8,8,0,0,0-10-.16L103.83,59.33a4,4,0,0,0-.5,5.85ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Z"></path>
                    </svg>
                </button>` : ''
                }
            </div>
                <div class="post-text">
                    <div class="ksdjfa a9trg">
                        <a class="post-creater" href="#"><div class="sprorterprofile"><img class="eiej3i" src="Ronaldo-Champions-league-Manchester-United.webp" /></div>${dt.author}</a>
                        <button class="ksdjf ksdjfjiudsf">Follow</button>
                    </div>                    
                    <p class="post-description a9trg">${ptDesReal}</p>
                    <a href="#" class="post-challenge g228ufdi a9trg"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fffafa" viewBox="0 0 256 256"><path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"></path></svg>${dt.challenge}</a>
                </div>
                <div class="saoidasda"></div>
            </div>
                    `
                    postsMultiCont.push(postThingy)
                }
            }
            let theThingGoingIn = ``;
            postsMultiCont.forEach(a =>
                theThingGoingIn += a
            )
            document.querySelector('.posts').insertAdjacentHTML('beforeend', `
                <div class="post oijsdv ijeirej4mkdmframnvidia" classification="*3ijroi32jroijreoiwr">
                            <div class="aisjj4mmmckkmcdockkburger">
            <button class="dfijfijvmountaindew siijriejroejfnsinstagrameijf"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm29.66,109.66-40,40a8,8,0,0,1-11.32-11.32L140.69,128,106.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,157.66,133.66Z"></path></svg></button>
            <button class="dfijfijvmountaindew2 siijriejroejfnsinstagrameijf"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm21.66,138.34a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32L115.31,128Z"></path></svg></button>
        </div>
                ${theThingGoingIn}
                            <ul class="dsjfodsijf">
            <li class="aek  "><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg></button>20,001</li>
            ${        likesPosts.includes(`${dt.classification}`) ? `<li class="aek ak-ac jdjn3jdnjclike2"><button class="ak jdjn3jdnjclike"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg></button><span class="pp3">${dt.likes.toLocaleString('en-US')}</span></li>` : `                <li class="aek  jdjn3jdnjclike2"><button class="ak jdjn3jdnjclike"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg></button><span class="pp3">${dt.likes.toLocaleString('en-US')}</span></li>`}
            <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path></svg></button>7,000</li>
            <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg></button></li>
            <li class="aek"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ed1c24" viewBox="0 0 256 256"><path d="M237.66,117.66l-80,80A8,8,0,0,1,144,192V152.23c-57.1,3.24-96.25,40.27-107.24,52h0a12,12,0,0,1-20.68-9.58c3.71-32.26,21.38-63.29,49.76-87.37,23.57-20,52.22-32.69,78.16-34.91V32a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,237.66,117.66Z"></path></svg></button></li>
            <li class="dsjfi3"><button class="ak"><svg class="kdkja" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path></svg><svg class="kdsjfkdsjf" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#ed1c24" viewBox="0 0 256 256"><path d="M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z"></path></svg></button></li>
        </ul></div>
        `)
    }

                }
        const app = new FlaruApp();
    })}
postRender()


let currentState = false;

const firebaseConfig = {
  apiKey: "AIzaSyCN6FZuI4CXIdV1F-PrAD6sAL-eTWwLPbM",
  authDomain: "flaru-421c5.firebaseapp.com",
  projectId: "flaru-421c5",
  storageBucket: "flaru-421c5.firebasestorage.app",
  messagingSenderId: "154854064616",
  appId: "1:154854064616:web:66a33c79a901f7e156645d",
  measurementId: "G-L9S3Y0X5QS"
};

const fireapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
const db = fireapp.firestore();
const storage = firebase.storage();

async function registerUserSupa(username2,uidtxt, date){
    console.log('hi')
    const { error: insertError } = await supabaseClient
    .from('users')
    .insert([
      {
        username: username2,
        uid: uidtxt,
        birth: date,
        aura: 25,
      }
    ])
}

function createNewUser(email, password) {
    currentState = true;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            registerUserSupa(document.querySelector('.dskengjkrngkjeng3').value,user.uid,document.querySelector('.ggbrics').value)
            document.querySelectorAll('.authentication-div').forEach(div => {div.classList.add('hide') 
            console.log('hi')})
            document.querySelector('.oifgoj').classList.add('hide');
            localStorage.setItem("uid", user.uid);
            document.querySelectorAll('.authentication-div').forEach(e=>e.classList.add('hide'))
            document.querySelector('.oifgoj').classList.add('hide')
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

const uid = localStorage.getItem('uid')

await supabaseClient
    .from('users')
    .select('*')
    .eq('uid', uid)
    .order('created_at', { ascending: false })
    .then(data =>{
        const dt = data.data[0]
        if(!dt) return
        document.querySelector('.cnnabcaura').textContent = `${dt.aura} aura`
    })

let userInfoUID = null;

function signIn(email, password){
    currentState = true;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        userInfoUID = user.uid;
        localStorage.setItem("uid", user.uid);
        console.log(localStorage.getItem('uid'))
        document.querySelectorAll('.authentication-div').forEach(e=>e.classList.add('hide'))
        document.querySelector('.oifgoj').classList.add('hide')
    })
    .catch((error) => {
    });
}

if(localStorage.getItem("uid")){
    document.querySelectorAll('.authentication-div').forEach(e=>e.classList.add('hide'))
    document.querySelector('.oifgoj').classList.add('hide')
}

document.querySelector('.kjdsfkjdsf-1').addEventListener('click', function() {
    console.log(true)
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.add('hide')
})

document.querySelector('.kjdsfkjdsf-2').addEventListener('click', function() {
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.add('hide')
})

document.querySelector('.kjdsfkjdsf').addEventListener('click', function() {
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.add('hide')
    document.querySelector('.oifgoj').classList.remove('hide')
})

    const form2 = document.querySelector('.bbc2');
    
    if (form2) {
        form2.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('.fjvjncjxsnap').value;
            const password = document.querySelector('.googol').value;
            
            signIn(email, password);
        });
    } 

async function getAllPosts() {
    const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error(error.message)
    return []
}

return data
}

const posts = await getAllPosts()
console.log(posts[0].files)

const form = document.querySelector('.dj3imcsdv4');
if (form) {
    form.addEventListener('submit', function(e) {
        alert('hi')
        e.preventDefault();
        const email = document.querySelector('.cj5cjayz').value;
        const password = document.querySelector('.godhfugnblessamerica2').value;
        
        createNewUser(email, password);
    });
}

