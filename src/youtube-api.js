import { loadingMessage } from "./loading";
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null

// Created with Tabnine extension
export function getVideoId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return false;
    }
}

export function loadVideo(url) {
    loadingMessage('Carregando vídeo do Youtube')

    return new Promise((resolve, reject) => {
        window.YTPlayer = new YT.Player('youtubeVideo', {
            videoId: getVideoId(url),
            events: {
                'onReady': () => resolve(),
                // 'onError': reject
            }
        })
    })
}