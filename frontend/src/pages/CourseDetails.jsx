import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import Img from "../components/common/Img";

import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { addToCart } from "../slices/cartSlice";
import GetAvgRating from "../../utils/avgRating";
import { ACCOUNT_TYPE } from "../../utils/constants";
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
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch {
        console.log("Failed to load course details");
      }
    };
    getCourse();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  useEffect(() => window.scrollTo(0, 0), []);

  if (paymentLoading || loading || !response) {
    return (
      <div className="mt-24 p-5 flex flex-col gap-4">
        <div className="h-44 rounded-xl bg-gray-800 animate-pulse"></div>
        <div className="h-4 w-3/4 rounded-xl bg-gray-700 animate-pulse"></div>
        <div className="h-4 w-1/2 rounded-xl bg-gray-700 animate-pulse"></div>
      </div>
    );
  }

  const {
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
      buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to purchase this course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      return toast.error("Instructors cannot buy courses.");
    }
    if (token) {
      dispatch(addToCart(response?.data.courseDetails));
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add this course to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white px-4 sm:px-6 lg:px-12 py-10 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: Course Details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 font-medium mb-2"
            >
              <GiReturnArrow /> Go Back
            </button>

            <div className="rounded-2xl overflow-hidden shadow-md lg:hidden">
              <Img src={thumbnail} alt="Course Thumbnail" className="w-full" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold">{courseName}</h1>
            <p className="text-gray-300 text-base sm:text-lg">
              {courseDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="text-yellow-400">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              <span>({ratingAndReviews.length} reviews)</span>
              <span>{studentsEnrolled.length} students</span>
            </div>

            <p className="text-gray-300">
              Created by{" "}
              <span className="font-semibold underline text-white">
                {instructor?.firstName} {instructor?.lastName}
              </span>
            </p>

            <div className="flex flex-wrap gap-5 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <BiInfoCircle /> Created at {formatDate(createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineGlobeAlt /> English
              </p>
            </div>

            {/* Mobile Buttons */}
            <div className="lg:hidden border-t border-gray-700 pt-4 mt-3">
              <p className="text-2xl font-semibold mb-3">₹ {price}</p>
              <button
                onClick={handleBuyCourse}
                className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md font-semibold mb-2"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-md font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* RIGHT: Floating Card */}
          <div className="hidden lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      {/* COURSE CONTENT SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
        {/* What You’ll Learn */}
        <div className="border border-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            What you'll learn
          </h2>
          {whatYouWillLearn?.split("\n").map((line, i) => (
            <p key={i} className="text-gray-300 mb-2">
              {i + 1}. {line}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tag?.map((t, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Course Accordion */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold">Course Content</h2>
            <button
              onClick={() => setIsActive([])}
              className="text-green-400 hover:text-green-300 text-sm"
            >
              Collapse All
            </button>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {courseContent.length} sections • {totalNoOfLectures} lectures
          </p>
          <div>
            {courseContent.map((course, i) => (
              <CourseAccordionBar
                key={i}
                course={course}
                isActive={isActive}
                handleActive={(id) =>
                  setIsActive(
                    !isActive.includes(id)
                      ? [...isActive, id]
                      : isActive.filter((e) => e !== id)
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-5">
          <Img
            src={instructor?.image}
            alt="Instructor"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold flex items-center gap-2">
              {instructor?.firstName} {instructor?.lastName}
              <MdOutlineVerified className="text-green-400 w-5 h-5" />
            </p>
            <p className="text-gray-300">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
