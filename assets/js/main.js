// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'WIN_PLAYER'

const playlist = $('.playlist');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [{
            name: "Ái Nộ 1",
            singer: "Masew x Khôi vũ",
            src: "assets/mp3/AiNo1-MasewKhoiVu-7078913.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg"
        },
        {
            name: "Độ Tộc 2",
            singer: "Masew x Độ Mixi x Phúc Du x Pháo",
            src: "assets/mp3/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg"
        },
        {
            name: "Thức Giấc",
            singer: "Dalab",
            src: "assets/mp3/ThucGiac-DaLAB-7048212.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg"
        },
        {
            name: "Sao Ta Ngược Lối",
            singer: "Đình Dũng",
            src: "assets/mp3/SaoTaNguocLoi-DinhDung-7052177.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/07/21/7/0/f/8/1626843874820.jpg"
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hứa Kim Tuyền x Hoàng Duyên",
            src: "assets/mp3/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/03/27/d/2/9/1/1616859493571.jpg"
        },
        {
            name: "Thê Lương",
            singer: "Phúc Chinh",
            src: "assets/mp3/TheLuong-PhucChinh-6971140.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "Monstar",
            src: "assets/mp3/cohenvoithanhxuan-MONSTAR-7050201.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg"
        },
        {
            name: "Phận Duyên Lỡ Làng",
            singer: "Phát Huy T4 x Truzg",
            src: "assets/mp3/PhanDuyenLoLang-PhatHuyT4Trugz-7004538.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/04/14/c/3/3/b/1618383513976.jpg"
        },
        {
            name: "Câu Hẹn Câu Thề",
            singer: "Đình Dũng x ACV",
            src: "assets/mp3/CauHenCauThe-DinhDung-6994741.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/03/29/2/2/1/e/1617029681297.jpg"
        },
        {
            name: "Chúng Ta Sau Này",
            singer: "T.R.I",
            src: "assets/mp3/ChungTaSauNay-TRI-6929586.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg"
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index='${index}''>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth;
        // Xử lý quay / dừng CD
        const cdThumbAnimte = cdThumb.animate([ //trả về 1 đối tượng animate
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity, // iterations Infinity = Sự lặp lại vô hạn
        })
        cdThumbAnimte.pause();
        // Xử lý phóng to / thủ nhỏ CD
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop

                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }
            // Xử lý events click btn play
        playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
            // xử lý / lắng nghe phím space
        window.onkeypress = function(e) {
                if (e.which === 32 && _this.isPlaying) {
                    audio.pause();
                } else if (e.which === 32 && !_this.isPlaying) {
                    audio.play();
                }
            }
            // khi song đc play
        audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing');
                cdThumbAnimte.play();
            }
            // khi song bị pause
        audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing');
                cdThumbAnimte.pause();
            }
            // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            // xử lý khi tua song
        progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }
            // Khi next song
        nextBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.nextSong()
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong()
            }
            // Khi pre song
        prevBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.playRandomSong();
                } else {
                    _this.prevSong()
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong()
            }
            // Xử lý bật / tắt random song
        randomBtn.onclick = function() {
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom', _this.isRandom);
                randomBtn.classList.toggle("active", _this.isRandom);
            }
            // Xử lý phát lại một bài hát 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);

        }

        // Xử lý khi kết thúc bài hát tự động phát lại /  next song
        audio.onended = function() {
                if (_this.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            }
            // Xử lý chuyển bài hát khi click
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                // xử lý song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // Xử lý option
                if (optionNode) {

                }
            }
        }


    },
    scrollToActiveSong: function() {
        if (this.currentIndex === 0) {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.src
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong();

    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong();

    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)

        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong();
    },

    start: function() {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // hiển thị trạng thái ban đầu của button repeat & random 
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);


    }
}
app.start();