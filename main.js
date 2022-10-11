

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const PLAYER_STORAGE_KEY = 'Music Player'

const selectSong = $('.selectsong');
const playlist = $('.playlist');
const audio = $('#audio');
const songImg = $('.songimg');
const songDes = $('.song_des');
const playBtn = $('.play');
const nextBtn = $('.forward');
const prevBtn = $('.backward');
const progress = $('.progress');
const direction = $('.direction');
const playlistSong = $('.playlist-song');
const wishlistBtn = $('.wishlist-icon');
const wishlist = $('.wishlist')
const wishlistSong = $('.wishlist-song');
const overlay = $('.overlay');
const optionSelect = $('.option-select');
const addBtn = $('.option-add');
const removeBtn = $('.option-remove');
const optionExit = $('.option-select__exit');
const optionWish = $('.song-list .option');
const app = {
    songStates: ["fa-repeat", "fa-arrow-rotate-right", "fa-shuffle"],
    currentState: 0,
    currentIndex: 0,
    // setting: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) || {}),
    songs: [
        {   
            
            name: 'Perfect',
            singer: 'Ed Sheeran',
            path: './assets/music/song0.mp3',
            image: './assets/img/img0.jpg'
        },
        {   
            
            name: 'I\'m Still Loving You',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/song1.mp3',
            image: './assets/img/img1.jpg'
        },
        {   
            
            name: 'Girl Like You',
            singer: 'Maroon 5',
            path: './assets/music/song2.mp3',
            image: './assets/img/img2.jpg'
        },
        {   
            
            name: 'Missing You',
            singer: 'Phương Ly',
            path: './assets/music/song3.mp3',
            image: './assets/img/img3.jpg'
    
        },
        {   
            
            name: 'Nếu Là Anh',
            singer: 'The Men',
            path: './assets/music/song4.mp3',
            image: './assets/img/img4.jpg'
    
        },
        {   
            
            name: 'Everytime We Touch',
            singer: 'Unknown',
            path: './assets/music/song5.mp3',
            image: './assets/img/img5.jpg'
        },
        {   
            
            name: 'I Do',
            singer: '911 Band',
            path: './assets/music/song6.mp3',
            image: './assets/img/img6.jpg'
    
        },
        {   
            
            name: 'Đánh Mất Em',
            singer: 'Tỉnh Lung',
            path: './assets/music/song7.mp3',
            image: './assets/img/img7.jpg'
    
        },
        {   
            
            name: 'Phi Điểu Và Ve Sầu',
            singer: 'Nhậm Nhiên',
            path: './assets/music/song8.mp3',
            image: './assets/img/img8.jpg'
    
        },
        {   
            
            name: 'My Love',
            singer: 'Westlife',
            path: './assets/music/song9.mp3',
            image: './assets/img/img9.jpg'
    
        },
    ],
    // setConfig: function(key, value) {
    //     this.config[key] = value;
    //     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    // },

    render: function() {
        const htmls = this.songs.map((song,index) => {
            return ` <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image:url('${song.image}') ;"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>`
        })
        playlistSong.innerHTML = htmls.join('\n')
    },

    renderWishList() {
        const html = Array.prototype.slice.call($$(".song")).map((song, index) => {
            if (song.classList.contains("wish")) {
                return ` <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image:url('${this.songs[index].image}') ;"></div>
                <div class="body">
                    <h3 class="title">${this.songs[index].name}</h3>
                    <p class="author">${this.songs[index].singer}</p>
                </div>
                <div class="option-wish">
                <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>`
        } else {
            return "";
        }
    });
        wishlistSong.innerHTML = html.join('\n')
    },

    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    changeStates: function () {
        this.currentState++;
        if (this.currentState >= this.songStates.length) {
            this.currentState = 0
        }
        direction.innerHTML = `<i i class="fa-solid ${this.songStates[this.currentState]}" ></i > `;
    },

    changActivesong: function() {
        const musics = $$(".song"||'.song.wish');
        musics.forEach((music) => {
            if (music.classList.contains("active")) {
                music.classList.remove("active");
            }
        })
        musics[this.currentIndex].classList.add("active");
    },

    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
            this.loadCurrentSong()
            this.changActivesong()

    },

    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length
            }
            this.loadCurrentSong()
            this.changActivesong()
            

    },

    randomSong: function() {
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.changActivesong()
        
        
    },

    scrollToActiveSong:  function() {
        const activeSong = $$(".song.active");
        activeSong.forEach((element) => {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 300);
        })
    },

    stopPropag: function (e) {
        e.stopPropagation();
    },

    handleEvents: function() {

        const _this = this;
        let isPlaying = true;
        // Handle CD rotate  

        direction.onclick = function() {
            _this.changeStates();
        } 

        const songImgAnimate = songImg.animate([
            {   transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        songImgAnimate.pause()

        // Play Pause song
        playBtn.onclick = function() {
            if (isPlaying) {
                audio.play()   
                isPlaying = false;
            } else {
                audio.pause()
                isPlaying = true;
            }
            }

        function formatTimer(number) {
            const minutes = Math.floor(number/60);
            const seconds = Math.floor(number%60);
            if (seconds > 9) {
                return `${minutes}:${seconds}`
            } else {
                return `${minutes}:0${seconds}`
            }
        }
        
        audio.onplay = function() {
            playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`
            playBtn.classList.add('playing')
            songImgAnimate.play()
        }
        
        audio.onpause = function() {
            playBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i>`
                playBtn.classList.remove('playing')
                songImgAnimate.pause()
        }
        // When press NextBtn
        nextBtn.onclick = function() {
            if(_this.currentState < 2 ) {
                _this.nextSong()
            }
            if(_this.currentState === 2) {
                _this.randomSong()
            }
            audio.play()
            _this.scrollToActiveSong()
            wishlistSong.innerHTML = "";
            _this.renderWishList();

        }
        // When press PrevBtn
        prevBtn.onclick = function() {
            if(_this.currentState < 2 ) {
                _this.prevSong()
            }
            if(_this.currentState === 2) {
                _this.randomSong()
            }
            audio.play()
            _this.scrollToActiveSong()
            wishlistSong.innerHTML = "";
            _this.renderWishList();
        }

        // When audio ended
        audio.onended = function() {
            if(_this.currentState === 0) {
                _this.nextSong()
                audio.play()
            }
            if(_this.currentState === 1) {
                _this.loadCurrentSong()
                audio.play()
            }
            if(_this.currentState === 2) {
                _this.randomSong()
                audio.play()
            }
            wishlistSong.innerHTML = "";
            _this.renderWishList();
            _this.scrollToActiveSong()
        }

        // When press wishlistBtn
        wishlistBtn.onclick = function() {
            wishlist.style.display = 'block'
            $('.music_player').classList.add('appear');
        }

        // Handle wishlist 
        // click close wishlist 
        $('.close-wishlist').onclick = function() {
            wishlist.style.display = 'none'
            $('.music_player').classList.remove('appear');
        }
        // Choose song in wishlist
        wishlist.onclick = function(e) {
            const songNode = e.target.closest('.wish');
            console.log(songNode)
            if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.changActivesong()
                    wishlistSong.innerHTML = "";
                    _this.renderWishList()
                    _this.scrollToActiveSong()
            }
            // Click option in wishlist
            else if (e.target.closest('.option-wish')) {
                _this.stopPropag(e);
                const wishSongs = $$(".song");
                const confirmBtnYes = optionSelect.querySelector(".option-add");
                const confirmBtnNo = optionSelect.querySelector(".option-remove");
                const order = e.target.closest(".song").dataset.index;
                overlay.classList.add("exist");
                optionSelect.classList.add("arise");

                optionSelect.querySelector(".option-select__heading").textContent = "Confirm to remove?";
                optionSelect.querySelector(".option-add").textContent = "YES";
                optionSelect.querySelector(".option-remove").textContent = "NO";

                confirmBtnYes.onclick = function (event) {
                    overlay.classList.remove("exist");
                    optionSelect.classList.remove("arise");
                    wishSongs[order].classList.remove("wish");
                    // wishlist.innerHTML = "";
                    _this.renderWishList();
                }

                confirmBtnNo.onclick = function (event) {
                    overlay.classList.remove("exist");
                    optionSelect.classList.remove("arise");
                }
            }
        }




         // Time update
        progress.onchange = function() {
            audio.currentTime = Math.floor(progress.value * audio.duration / 100); 
        }
        audio.ontimeupdate = function() {
            // display time
                $('.time_current').innerHTML = formatTimer(audio.currentTime);
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                    progress.value = progressPercent;
                    $('.time_duration').innerHTML = formatTimer(audio.duration);                
                } else {
                    $('.time_duration').innerHTML = '-:--';
                }
        }

        //  Choose song by click
        playlistSong.onclick = function(e) {
            const wishSongs = $$('.song')
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode) {
                    const order = songNode.getAttribute("data-index") || songNode.dataset.index;
                    _this.currentIndex = Number(order)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.changActivesong()
                    _this.scrollToActiveSong()
                    wishlistSong.innerHTML = "";
                    _this.renderWishList();
            }
            // When press in option button
            else if(e.target.closest('.option')) {
                e.stopPropagation();
                const order = e.target.closest(".song").dataset.index;
                optionSelect.classList.add("arise");
                overlay.classList.add("exist");
                
                optionSelect.querySelector(".option-select__heading").textContent = "Your option?";
                optionSelect.querySelector(".option-add").textContent = "Add to wishlist";
                optionSelect.querySelector(".option-remove").textContent = "Remove from wishlist";

               // Click to add to wishlist
                addBtn.onclick = function() {
                    overlay.classList.remove("exist");
                    optionSelect.classList.remove("arise");
                    wishSongs[order].classList.add("wish");
                    wishlistSong.innerHTML = "";
                    _this.renderWishList();
                }

                // Click remove from wishlist
                removeBtn.onclick = function() {
                    overlay.classList.remove("exist");
                    optionSelect.classList.remove("arise");
                    wishSongs[order].classList.remove("wish");
                    wishlistSong.innerHTML = "";
                    _this.renderWishList();
                }

                // Click exit to close option
                optionExit.onclick = function() {
                    overlay.classList.remove("exist");
                    optionSelect.classList.remove("arise");
                }

                 //Prevent propagation from click on option notification to close the overlay layout
                optionSelect.onclick = function (e) {
                e.stopPropagation();
                }

                overlay.onclick = function () {
                    overlay.classList.remove("exist");
                }
            }
            
        }
     
      

    },
    
    loadCurrentSong: function() {
        songImg.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        songDes.innerHTML = `<div class="song_name">${this.currentSong.name}</div>
                            <div class="song_author">${this.currentSong.singer}</div>`;
        
    },

    // select song
    openPlaylist: function () {
        selectSong.onclick = function() {
            playlist.style.display = 'block';
            $('.music_player').classList.add('appear');
        }
    },
    closePlaylist: function() {
        $('.close-list').onclick = function() {
            playlist.style.display = 'none';
            $('.music_player').classList.remove('appear');
        }
    },


    start: function() {
        this.defineProperties()
        this.render()
        this.renderWishList()
        this.handleEvents()
        this.loadCurrentSong()
        this.openPlaylist()
        this.closePlaylist()

    }
}
app.start()
