import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import { setCourseViewSidebar } from "../slices/sidebarSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(true);

  // get Full Details Of Course
  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, [courseId, token, dispatch]);

  // handle sidebar for small devices
  const { courseViewSidebar } = useSelector((state) => state.sidebar);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  // close / open sidebar according screen size
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setCourseViewSidebar(false));
    } else {
      dispatch(setCourseViewSidebar(true));
    }
  }, [screenSize, dispatch]);

  return (
    <>
      <div className="relative flex min-h-screen">
        {/* view course sidebar */}
        {courseViewSidebar && <VideoDetailsSidebar setReviewModal={setReviewModal} />}

        {/* main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="mt-14 mx-4 sm:mx-6 lg:mx-6 flex-1">
            <Outlet />
          </div>
        </div>
      </div>

      {/* review modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
