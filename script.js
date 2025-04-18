const clientId = "6tn5unrr0xiau7qmeihljr1uk628nm";
const clientSecret = "gl4v4exjfj9sr225q0ep9llxax6y8q";

async function getAccessToken() {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials"
    })
    });

    const data = await res.json();
    return data.access_token;
}

async function checkStreamerLive(streamerName, button, token) {
    try {
    const url = `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(streamerName)}`;
    const res = await fetch(url, {
        headers: {
        "Client-ID": clientId,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    if (data.data && data.data.length > 0) {
        console.log(`${streamerName} is live`);
        button.classList.add("live");
    } else {
        console.log(`${streamerName} is offline`);
    }
    } catch (err) {
    console.error(`Error checking ${streamerName}:`, err);
    }
}

async function init() {
    const token = await getAccessToken();
    const buttons = document.querySelectorAll(".streamers");

    buttons.forEach(button => {
    const streamerName = button.getAttribute("data-streamer");
    checkStreamerLive(streamerName, button, token);
    });
}

init();
// Run it on load

