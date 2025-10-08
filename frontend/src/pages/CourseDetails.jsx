import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";

import GetAvgRating from "../../utils/avgRating";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { addToCart } from "../slices/cartSlice";

import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import Img from "./../components/common/Img";
import toast from "react-hot-toast";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details",error.message);
      }
    };
    fetchCourseDetailsData();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (paymentLoading || loading || !response) {
    return (
      <div className="mt-24 p-5 flex flex-col justify-center gap-4 animate-pulse">
        <div className="flex flex-col sm:flex-col-reverse gap-4">
          <div className="h-44 bg-gray-300 rounded-xl"></div>
          <div className="h-9 bg-gray-300 rounded-xl"></div>
        </div>
        <div className="h-4 w-[55%] bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-[75%] bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-[35%] bg-gray-300 rounded-xl"></div>
        <div className="hidden lg:block absolute right-6 top-20 h-[450px] w-1/3 rounded-xl bg-gray-300"></div>
        <div className="mt-24 h-60 lg:w-[60%] bg-gray-300 rounded-xl"></div>
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    tag,
  } = response?.data?.courseDetails;

  const handleBuyCourse = () => {
 
    if (token) {
      const coursesId = [courseId];
      console.log(courseId)
      buyCourse(token, coursesId, user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(response?.data.courseDetails));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full bg-gray-900 text-white">
        <div className="mx-auto px-4 lg:w-[1200px]">
          <div className="grid min-h-[450px] justify-items-center py-8 lg:justify-items-start">
            {/* Back Button */}
            <div
              className="mb-5 cursor-pointer hover:opacity-80"
              onClick={() => navigate(-1)}
            >
              <GiReturnArrow className="w-8 h-8 text-yellow-400" />
            </div>

            {/* Thumbnail for mobile */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <Img
                src={thumbnail}
                alt="course thumbnail"
                className="w-full rounded-xl object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="mb-5 flex flex-col justify-center gap-4 py-5 text-lg">
              <p className="text-3xl sm:text-4xl font-bold">{courseName}</p>
              <p className="text-gray-300">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-400">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnrolled.length} students enrolled</span>
              </div>
              <p>
                Created By{" "}
                <span className="font-semibold underline">
                  {instructor?.firstName} {instructor?.lastName}
                </span>
              </p>
              <div className="flex flex-wrap gap-5 text-base">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile Buy/Add Buttons */}
            <div className="flex w-full flex-col gap-4 border-y border-gray-700 py-4 lg:hidden">
              <p className="text-3xl font-semibold text-white">₹{price}</p>
              <button
                className="bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gray-800 border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Floating Course Card (Desktop) */}
          <div className="hidden lg:block absolute right-6 top-20 w-1/3 max-w-[400px]">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="mx-auto px-4 text-white lg:w-[1200px]">
        <div className="max-w-[800px]">
          {/* What you'll learn */}
          <div className="my-8 border border-gray-700 p-8 rounded-lg">
            <p className="text-2xl font-semibold">What you'll learn</p>
            <div className="mt-3">
              {whatYouWillLearn &&
                whatYouWillLearn.split("\n").map((line, index) => (
                  <div key={index} className="flex items-start mb-2">
                    <p className="font-bold">{index + 1}.</p>
                    <p className="ml-2">{line}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <p className="text-lg font-bold">Tags:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {tag &&
                tag.map((item, ind) => (
                  <p
                    key={ind}
                    className="bg-yellow-300 text-black rounded-full text-center font-semibold px-3 py-1"
                  >
                    {item}
                  </p>
                ))}
            </div>
          </div>

          {/* Course Content */}
          <div>
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2 text-gray-300">
                <div className="flex gap-2">
                  <span>{courseContent.length} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response.data?.totalDuration} total time</span>
                </div>
                <button
                  className="text-yellow-400 hover:underline"
                  onClick={() => setIsActive([])}
                >
                  Collapse All Sections
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author */}
            <div className="mb-12 py-4">
              <p className="text-2xl font-semibold mb-3">Author</p>
              <div className="flex items-center gap-4">
                <Img
                  src={instructor?.image}
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    {instructor?.firstName} {instructor?.lastName}
                    <MdOutlineVerified className="text-blue-400" />
                  </p>
                  <p className="text-gray-300">
                    {instructor?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
