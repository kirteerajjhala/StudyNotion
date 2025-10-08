import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import IconBtn from "../../common/IconBtn"
import { HiMenuAlt1 } from "react-icons/hi"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )
  const { courseViewSidebar } = useSelector((state) => state.sidebar)

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startPlaying, setStartPlaying] = useState(false)
  const [autoplayAllowed, setAutoplayAllowed] = useState(false)

  // Load video data based on params
  useEffect(() => {
    if (!courseSectionData.length) return
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
    } else {
      const section = courseSectionData.find((s) => s._id === sectionId)
      const subsection = section?.subSection.find((sub) => sub._id === subSectionId)
      if (subsection) setVideoData(subsection)
      setVideoEnded(false)
      setStartPlaying(false)
    }
  }, [courseSectionData, location.pathname, navigate, courseId, sectionId, subSectionId])

  // Detect if browser allows autoplay
  useEffect(() => {
    const testAutoplay = async () => {
      try {
        const mutedPlayer = document.createElement("video")
        mutedPlayer.muted = true
        mutedPlayer.src = videoData?.videoUrl || ""
        await mutedPlayer.play()
        setAutoplayAllowed(true)
      } catch (err) {
        setAutoplayAllowed(false)
      }
    }
    if (videoData?.videoUrl) testAutoplay()
  }, [videoData])

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex((s) => s._id === sectionId)
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subSectionId)
    return sectionIndex === 0 && subIndex === 0
  }

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex((s) => s._id === sectionId)
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subSectionId)
    const lastSectionIndex = courseSectionData.length - 1
    const lastSubIndex = courseSectionData[lastSectionIndex]?.subSection.length - 1
    return sectionIndex === lastSectionIndex && subIndex === lastSubIndex
  }

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex((s) => s._id === sectionId)
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subSectionId)

    if (subIndex < courseSectionData[sectionIndex].subSection.length - 1) {
      const nextSubId = courseSectionData[sectionIndex].subSection[subIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`)
    } else if (sectionIndex < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[sectionIndex + 1]._id
      const nextSubId = courseSectionData[sectionIndex + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubId}`)
    }
  }

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex((s) => s._id === sectionId)
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subSectionId)

    if (subIndex > 0) {
      const prevSubId = courseSectionData[sectionIndex].subSection[subIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`)
    } else if (sectionIndex > 0) {
      const prevSectionId = courseSectionData[sectionIndex - 1]._id
      const prevSubId = courseSectionData[sectionIndex - 1].subSection.slice(-1)[0]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    try {
      const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId }, token)
      if (res) dispatch(updateCompletedLectures(subSectionId))
    } catch (err) {
      console.error("Lecture completion error:", err)
    }
    setLoading(false)
  }

  if (courseViewSidebar && window.innerWidth <= 640) return null

  return (
    <div className="flex flex-col gap-5 text-white relative p-4">
      {/* Sidebar toggle */}
      <div
        className="sm:hidden absolute left-4 top-3 cursor-pointer"
        onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
      >
        {!courseViewSidebar && <HiMenuAlt1 size={30} />}
      </div>

      {/* Video Player */}
<div className="relative w-full h-[630px] bg-black">
  <video
    src={videoData?.videoUrl}
    controls
    className="w-full h-full object-contain"
    onEnded={() => setVideoEnded(true)}
    autoPlay={autoplayAllowed}
    muted={!autoplayAllowed}
  />

  {/* Overlay for initial click if autoplay not allowed */}
  {!autoplayAllowed && !startPlaying && (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 gap-4">
      <button
        onClick={() => setStartPlaying(true)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded text-lg"
      >
        Play Video
      </button>
    </div>
  )}

  {/* Overlay for video ended with Prev/Next */}
  {videoEnded && (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 gap-4">
      {!completedLectures.includes(subSectionId) && (
        <IconBtn
          disabled={loading}
          onClick={handleLectureCompletion}
          text={loading ? "Loading..." : "Mark As Completed"}
          customClasses="px-4 py-2 text-lg"
        />
      )}

      {/* Prev/Next Buttons inside overlay */}
      <div className="flex gap-4 mt-4 justify-center">
        {!isFirstVideo() && (
          <button
            onClick={goToPrevVideo}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Prev
          </button>
        )}
        {!isLastVideo() && (
          <button
            onClick={goToNextVideo}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )}
</div>


      {/* Prev/Next Buttons always visible below video */}
      <div className="flex gap-4 mt-4 justify-center">
        {!isFirstVideo() && (
          <button
            onClick={goToPrevVideo}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Prev
          </button>
        )}
        {!isLastVideo() && (
          <button
            onClick={goToNextVideo}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Next
          </button>
        )}
      </div>

      {/* Video Title & Description */}
      <h1 className="mt-4 text-2xl md:text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6 text-gray-300">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
