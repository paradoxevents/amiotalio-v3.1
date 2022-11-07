import React from "react"
import Vimeo from "@u-wave/react-vimeo"
import { Router, Route } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const VideoListing = () => {
  return (
    <section className="videos">
      <h3>Video Courses</h3>

      <Router>
        <Listing path="/" />
        <Video path="/:video" />
      </Router>
    </section>
  )
}

export default VideoListing

const Listing = () => {
  // console.log("list")
  return (
    <ul className="video-listing">
      {videoData.map((item, i) => (
        <li key={i} className="video-listing__item">
          {/* <Link to={`/account/courses/${item.vimeo_id}`}> */}
          {/* <p className="listing-tagline">Episode {i + 1}</p> */}
          <h4 className="listing-title">{item.title}</h4>
          {/* </Link> */}
          {/* <Link to={`/account/courses/${item.vimeo_id}`}> */}
          {/* <img
              className="video-thumbnail"
              src={item.thumbnail}
              alt="thumbnail"
            /> */}
          <Vimeo className="video-player" video={item.vimeo_id} responsive />
          {/* </Link> */}
        </li>
      ))}
    </ul>
  )
}

const Video = ({ video }) => {
  // console.log(video)

  const _video = videoData.find(item => item.vimeo_id === video)

  // console.log(_video)

  const { vimeo_id } = _video

  return (
    <>
      <h3>Video</h3>
      <Vimeo className="video-player" video={vimeo_id} responsive />
    </>
  )
}

const videoData = [
  {
    id: 0,
    title: "Ep. 1 - Introduction",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684653870",
  },
  {
    // ep 2 https://vimeo.com/684785215
    id: 1,
    title: "Ep. 2 - What is Blockchain",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684785215",
  },
  {
    // ep 3 https://vimeo.com/684784476
    id: 2,
    title: "Ep. 3 - Smart Contracts",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684784476",
  },
  {
    id: 3,
    title: "Ep. 4 - Altcoins",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684791390",
  },
  {
    // ep 5 https://vimeo.com/684784021
    id: 4,
    title: "Ep. 5 - Open Source & Hard Fork",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684784021",
  },
  {
    // ep 6 https://vimeo.com/684783454
    id: 5,
    title: "Ep. 6 - Exchanges",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684783454",
  },
  {
    // ep 7 https://vimeo.com/684779867 Do your research Pt 1
    id: 6,
    title: "Ep. 7 - Do Your Own Research Pt. 1",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684779867",
  },
  {
    // ep 8 https://vimeo.com/684777715 do your research pt 2
    id: 7,
    title: "Ep. 8 - Do Your Own Research Pt. 2",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684777715",
  },
  {
    // ep 9 684750580
    id: 8,
    title: "Ep. 9 - Technical Analysis",
    thumbnail:
      "https://github.com/paradoxevents/files/blob/main/thumb.png?raw=true",
    vimeo_id: "684750580",
  },
]
