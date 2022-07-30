module.exports = (client) => {
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const libsodium = require("libsodium-wrappers");
const voice = require("@discordjs/voice");
const ffmpeg = require("ffmpeg-static");
const { DisTube } = require("distube");
const distube = new DisTube(client, {
	searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 25,
  savePreviousSongs: true, 
	leaveOnFinish: false,
	leaveOnStop: false,
	nsfw: true,
	plugins: [
        new SpotifyPlugin({ 
            parallel: true, 
            emitEventsAfterFetching: true,
            api: {
              clientId: "fc0d728b397c4f8398d2a13345c6d47c", 
              clientSecret: "a2a3e65a22b64357a6791b66cd1de4b5"
            }
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin({ update: true })
    ],
    youtubeCookie: "VISITOR_INFO1_LIVE=KAnwPD-vmGE; SID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44OMykWx9Qwr_dIcBhRxjRjg.; __Secure-1PSID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44pYGTKv1KrWPlvs9xxPQ41g.; __Secure-3PSID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44Z4qDi8CFg8WW2a3kcmbMYg.; HSID=Azu4HJa3AIG0PC2SL; SSID=AxCDXBMAGZoY13kvP; APISID=KwWgVTNlitJzn9UQ/A0lr9IhyijPgPW6Ha; SAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; __Secure-1PAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; __Secure-3PAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; YSC=qfXIawav8Hk; LOGIN_INFO=AFmmF2swRgIhAM3-5bd0gVsZ544PemCs1lHbAImxGsSm8COAnk5eLA83AiEA97NSeJZwOehvW2WA9AM8Tt1rB-YmzwYp4xbtlCmR3Hk:QUQ3MjNmeGVjcTV3QVhGS05PYmFRSWZwdXZlMS1DNU9RSW53Zm5JZDBjaTBxdjJnanV4dmR3UGJWeWVPNHJlUndCS3gzczdRQXVWdFRtRWlkaER6MFdLZEJlTHh5ZFZMaWpreGFWQVpjVEs2TTdZemtaRGM4eHVpeFd2c3lrbUhrTDRKNG5FWU9LU3BFZ0QyQkNhUktOQzhiZWJlSDY5a2hR; PREF=tz=Asia.Bangkok&f6=400; SIDCC=AJi4QfE3mhs3Iwk0sITqhGMHmYE3Y25SIBjIbA2ph0C1tA5uoi-kIUvkM962NBXAz23ShYwgbA; __Secure-3PSIDCC=AJi4QfEMsvf7I1nYqRXINYYCVQQaOc1D1N_lIyxKzVgmScwoqWnMHEimjWvMm-MLZPzN6Ywx",
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
        youtubeCookie: "VISITOR_INFO1_LIVE=KAnwPD-vmGE; SID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44OMykWx9Qwr_dIcBhRxjRjg.; __Secure-1PSID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44pYGTKv1KrWPlvs9xxPQ41g.; __Secure-3PSID=GQjPfJXVkW63JHdicSKmT7jbzh-rAOS21sbAsa3tsteMoA44Z4qDi8CFg8WW2a3kcmbMYg.; HSID=Azu4HJa3AIG0PC2SL; SSID=AxCDXBMAGZoY13kvP; APISID=KwWgVTNlitJzn9UQ/A0lr9IhyijPgPW6Ha; SAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; __Secure-1PAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; __Secure-3PAPISID=9I3XSSvUyxZH4vHf/AOjIyZKuW8ZGgq-1s; YSC=qfXIawav8Hk; LOGIN_INFO=AFmmF2swRgIhAM3-5bd0gVsZ544PemCs1lHbAImxGsSm8COAnk5eLA83AiEA97NSeJZwOehvW2WA9AM8Tt1rB-YmzwYp4xbtlCmR3Hk:QUQ3MjNmeGVjcTV3QVhGS05PYmFRSWZwdXZlMS1DNU9RSW53Zm5JZDBjaTBxdjJnanV4dmR3UGJWeWVPNHJlUndCS3gzczdRQXVWdFRtRWlkaER6MFdLZEJlTHh5ZFZMaWpreGFWQVpjVEs2TTdZemtaRGM4eHVpeFd2c3lrbUhrTDRKNG5FWU9LU3BFZ0QyQkNhUktOQzhiZWJlSDY5a2hR; PREF=tz=Asia.Bangkok&f6=400; SIDCC=AJi4QfE3mhs3Iwk0sITqhGMHmYE3Y25SIBjIbA2ph0C1tA5uoi-kIUvkM962NBXAz23ShYwgbA; __Secure-3PSIDCC=AJi4QfEMsvf7I1nYqRXINYYCVQQaOc1D1N_lIyxKzVgmScwoqWnMHEimjWvMm-MLZPzN6Ywx",
    },
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: true,
  });
  client.distube = distube;
};