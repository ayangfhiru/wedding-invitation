const url = window.location.search;
const urlParams = new URLSearchParams(url);
function namaPenerima(url) {
    const nama = url.get('to');
    const sendTo = document.querySelector('#sendTo');
    if (urlParams.size >= 1) {
        if (nama.length > 0) {
            sendTo.textContent = nama;
        }
    }
}
namaPenerima(urlParams);

const sourceAudio = './public/audio/intrument.mp3';
const audio = new Audio(sourceAudio);
audio.autoplay = true;

const btnAudio = document.querySelector('#audio');
btnAudio.addEventListener('click', function () {
    audio.play();
    audio.muted = false;
});

let tinggiY = 0;
window.addEventListener('scroll', function () {
    tinggiY = this.scrollY; 
    if (tinggiY >= 200) {
        btnAudio.classList.remove('hidden');
    } else {
        btnAudio.classList.add('hidden');
    }
});

const opnUndangan = document.getElementById('opnundangan');
const content = document.getElementById('content');
opnUndangan.addEventListener('click', function () {
    content.classList.remove('hidden');
    location.href = "#content";
    audio.play();
});

// Lazy Load
const noSee = document.querySelectorAll('.nosee');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(el => {
            if (el.isIntersecting) {
                el.target.classList.add('show');
            } else {
                el.target.classList.remove('show');
            }
        });
    },
    {
        threshold: 0.03
    }
);

noSee.forEach(elNoSee => {
    observer.observe(elNoSee);
});

const noSeeGallery = document.querySelectorAll('.gallery');
const observerGallery = new IntersectionObserver(
    entries => {
        entries.forEach(el => {
            if (el.isIntersecting) {
                el.target.classList.add('showGallery');
            } else {
                el.target.classList.remove('showGallery');
            }
        });
    },
    {
        threshold: 0.03
    }
);

noSeeGallery.forEach(elNoSee => {
    observerGallery.observe(elNoSee);
});

// Countdown
function countdown(acara) {
    const hari = document.getElementById('hari');
    const jam = document.getElementById('jam');
    const menit = document.getElementById('menit');
    const detik = document.getElementById('detik');

    const myInterval = setInterval(() => {
        const today = new Date().getTime();
        const mulai = new Date(acara).getTime();
        const distance = mulai - today;
        if (distance > 0) {
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            let seconds = Math.floor(distance % (1000 * 60) / 1000);

            if (distance <= 0) {
                clearInterval(myInterval);
            }

            hari.innerText = days;
            jam.innerText = hours;
            menit.innerText = minutes;
            detik.innerText = seconds;
        }
    }, 1000);

    hari.innerText = 0;
    jam.innerText = 0;
    menit.innerText = 0;
    detik.innerText = 0;
}
const tglAcara = "20 July 2023 16:00:00";
countdown(tglAcara);

// gallery
function gallery() {
    const idGallery = document.getElementById('gallery');
    const galley = idGallery.querySelectorAll('img');
    const imgTotal = idGallery.querySelector('#imgTotal');
    const btnPrev = idGallery.querySelector('.prev');
    const btnNext = idGallery.querySelector('.next');
    let nomor = 0;
    imgTotal.textContent = `01/0${galley.length}`;

    btnPrev.addEventListener('click', function (e) {
        e.preventDefault();
        if (nomor == 0) {
            nomor = (galley.length - 1);
        } else {
            nomor--;
        }
        return ChangeImage(nomor);
    });

    btnNext.addEventListener('click', function (e) {
        e.preventDefault();
        if (nomor < (galley.length - 1)) {
            nomor++;
        } else {
            nomor = 0;
        }
        return ChangeImage(nomor);
    });

    function ChangeImage(no) {
        setTimeout(() => {
            galley[0].src = galley[no].dataset.src;
            galley[0].classList.add('blink');
        }, 500)
        galley[0].classList.remove('blink');
        imgTotal.textContent = `0${no + 1}/0${galley.length}`;
    }
}
gallery();

// Copy Rekening
function noRek() {
    const copy = document.querySelectorAll('#copy');
    copy.forEach(function (e) {
        e.addEventListener('click', function (el) {
            el.preventDefault();
            Copyrekening(el);
        })
    });

    function Copyrekening(element) {
        const card = element.target.offsetParent.offsetParent;
        const rekening = card.querySelector('#rekening');
        navigator.clipboard.writeText(rekening.innerText);
    }
}
noRek();

// Ucapan
function ucapan() {
    const kirimUcapan = document.getElementById('kirimUcapan');
    const formUcapan = document.getElementById('formUcapan');
    const outputUcapan = document.getElementById('outputUcapan');
    const loading = document.getElementById('loadingUcapan');

    window.addEventListener('DOMContentLoaded', function () {
        getUcapan();
    });

    kirimUcapan.addEventListener('click', function (e) {
        e.preventDefault();
        let kehadiran = document.getElementById('kehadiran').value;
        let data = new FormData(formUcapan);
        if (data.get('nama') == 0 || data.get('nama') == null) {
            return alert('Mohon isikan Nama jika ingin memberikan Ucapan');
        }
        data.append('kehadiran', kehadiran);
        postUcapan(data);
    });

    async function getUcapan() {
        outputUcapan.innerHTML = ""
        const sheetId = "1eooniZxFliPIFI1BV8EVXRmJUG1SY_4eWF-S7xiQThM";
        const apikey = "AIzaSyDHDvbDbmcUIp54RxDBo18_yjSzYrU1dGQ";

        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/?key=${apikey}&includeGridData=true`;
        const result = await fetch(sheetUrl);
        const { sheets } = await result.json();
        const fristSheet = sheets[0];
        const dataPesan = fristSheet.data[0].rowData
            .filter(function (_, index) {
                return index;
            })
            .map(function (e) {
                const { values } = e;
                return {
                    nama: values[0].formattedValue,
                    kehadiran: values[1].formattedValue,
                    ucapan: values[2].formattedValue,
                }
            });

        dataPesan.forEach((key, index) => {
            const markup = `<li class="mb-4">
                                <p class="text-sm font-oswald text-quaternary">${key.nama}</p>
                                <p class="mt-1 text-xs font-extralight text-gray-500">${key.kehadiran}</p>
                                <p class="text-xs mt-1 text-gray-600">${key.ucapan}</p>
                            </li>`;
            outputUcapan.insertAdjacentHTML('afterbegin', markup);
        })

        return dataPesan;
    }

    async function postUcapan(data) {
        loading.classList.add('loading');
        const sheetUrl = `https://script.google.com/macros/s/AKfycbwC2RRE1X9E39z5-Hh52HB2ER9Ds0ndIn4wNhL-EAnxaC7dDja2mDVThS1j1kGQRxez/exec`;
        const result = await fetch(sheetUrl, {
            method: "POST",
            body: data
        })
            .then(response => response.json())
            .then(data => console.log(data));
        formUcapan.reset();
        loading.classList.remove('loading');
        getUcapan();
    }
}
ucapan();