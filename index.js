
/* Fetch call, getting data*/
fetch('https://www.googleapis.com/youtube/v3/playlistItems' + '?playlistId=PLTa3QixZSIHRgPy5m1WxF2NnkUMxVwng2&key=&part=snippet&maxResults=20')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let id = data.items[randomNumber()].snippet.resourceId.videoId
    mainVideo(id)
    nextVideoLoop(data)
  })

/* function to add videos*/
function nextVideoLoop(data) {
  data.items.forEach(item => {
    let thumb = item.snippet.thumbnails.medium.url
    let title = item.snippet.title
    let description = item.snippet.description.substring(0, 100)
    let vidId = item.snippet.resourceId.videoId

    let videos = document.querySelector('.nextVideo')
    let articleElement = document.createElement('article')
    articleElement.innerHTML +=
      `<img src="${thumb}" alt="show video" class="picture">
      <div id="info">
        <h2>${title}</h2>
        <p>${description}</p>
      </div>`

    articleElement.setAttribute('data-key', vidId)
    videos.appendChild(articleElement)
    document.querySelector(`article[data-key="${vidId}"]`).addEventListener('click', () => { mainVideo(vidId) })
  })
}

/* function for video player*/
function mainVideo(id) {
  let showVideo = document.querySelector('.video')
  showVideo.innerHTML =
    `<iframe width="700px" height="300px"
    src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
}

/*function to give video player random video on load*/
function randomNumber() {
  return Math.floor(Math.random() * 14)
}

