let link = null;
const form = document.querySelector('#penerima');

const btnGenerate = document.querySelector('#generate');
btnGenerate.addEventListener('click', generate);

function generate() {
    const url = window.location.origin;
    const encode = encodeURIComponent(form.value.trim());
    const display = document.querySelector('#urlDisplay');
    const sendWa = document.querySelector('#sendWa');
    const cobaUrl = document.querySelector('#cobaUrl');
    if (form.value.length == 0 || form
        .value.length >= 26) {
        alert('Isikan nama dan jangan melebihi 26 Karakter');
    } else {
        link = `${url}?to=${encode}`;
        display.textContent = link;
        sendWa.classList.remove('hidden');
        cobaUrl.classList.remove('hidden');
    }
}


const btnWa = document.querySelector('#sendWa');
btnWa.addEventListener('click', function (e) {
    e.preventDefault();
    openWhatsapp();
});

function openWhatsapp() {
    const text = `Assalamu'alaikum Wr. Wb 
Bismillahirahmanirrahim. 

Yth. ${form.value} 

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami : 

Dira Putri Syakila & Febryan Rudi Pratama

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi : 

${link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini. Terima kasih banyak atas perhatiannya.

Wassalamu'alaikum Wr. Wb.
Terima Kasih.`;
const encode = encodeURIComponent(text);
    window.open(`https://wa.me/send?phone=&text=${encode}`, '_blank');
}

const cobaUrl = document.querySelector('#cobaUrl');
cobaUrl.addEventListener('click', function (e) {
    e.preventDefault();
    if (link != null) {
        window.open(link, '_blank');
    }
});