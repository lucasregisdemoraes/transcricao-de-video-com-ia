const renderChunk = ({ timestamp, text }) => `
    <div class="chunk">
        <time>${getMinutes(timestamp)}</time>
        <p>
            ${groupedText(text, timestamp)}
        </p>
    </div>
`

function getMinutes(timestamp) {
    let date = new Date(null)
    date.setTime((timestamp[0] * 1000))
    return date.toISOString().slice(14, 19)
}

window.seek = function (event) {
    const seekTo = event.currentTarget.dataset.seekTo
    window.YTPlayer.seekTo(seekTo)
    window.YTPlayer.playVideo()
}

function groupedText(text, timestamp) {
    let words = text.split(" ")

    let groups = []
    for (let index = 0; index < words.length; index++) {
        if (index % 3 === 0) {
            groups.push(words.slice(index, index + 3).join(" "))
        }
    }

    return groups.map((group, index) => {
        const [startTime, endTime] = timestamp

        const videoTimeFromWordsGroup = (((endTime - startTime) / (groups.length - index)) + startTime)

        // const lettersQuantity = group.length
        // const duration = endTime - startTime
        // const lettersQuantityPerSecond = lettersQuantity / duration
        // const percentage = (lettersQuantity / (lettersQuantityPerSecond * 100))
        // const videoTimeFromWordsGroup = ((percentage * duration)* 10) + startTime

        const seekTo = index == 0 ? startTime : videoTimeFromWordsGroup

        return `<span onClick="seek(event)" data-seek-to="${seekTo}">${group}</span>`
    }).join(" ")

}

export function renderText({ chunks }) {
    document.querySelector('#transcription .content').innerHTML = chunks.map(chunk => renderChunk(chunk)).join("")
}