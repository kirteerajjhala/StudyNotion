import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import { getAllInstructorDetails } from "../../../services/operations/adminApi";
import IconBtn from "../../common/IconBtn";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="flex p-5 flex-col gap-6 border-b border-2 border-b-richblack-500">
    <div className="flex flex-col sm:flex-row gap-5 items-center mt-7">
      <div className="h-[150px] w-[150px] rounded-full skeleton"></div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-[160px] rounded-xl skeleton"></div>
        <div className="h-4 w-[270px] rounded-xl skeleton"></div>
        <div className="h-4 w-[100px] rounded-xl skeleton"></div>
      </div>
    </div>
    <div className="flex gap-5">
      <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
      <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
      <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
    </div>
  </div>
);

function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      try {
        setLoading(true);
        const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
        if (allInstructorsDetails) {
          setAllInstructorDetails(allInstructorsDetails);
          setInstructorsCount(instructorsCount);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (!allInstructorDetails || allInstructorDetails.length === 0)
    return <div className="text-5xl py-5 bg-yellow-800 text-white text-center">No Data Available</div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-14 flex items-center justify-between text-white">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          All Instructors Details
        </h1>
        <IconBtn text="Add Instructor" onclick={() => navigate("/admin/add-instructor")}>
          <VscAdd />
        </IconBtn>
      </div>

      {/* Instructors Table */}
      <Table className="rounded-xl border-2 border-richblack-500">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-500 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Instructors : {instructorsCount}
            </Th>
            <Th className="ml-4 text-sm font-medium uppercase text-richblack-100">Status</Th>
            <Th className="ml-4 text-sm font-medium uppercase text-richblack-100">Approval</Th>
          </Tr>
        </Thead>

        <Tbody>
          {allInstructorDetails.map((instructor) => (
            <div key={instructor._id} className="border-x border-2 border-richblack-500">
              <Tr className="flex gap-x-10 px-6 py-8">
                {/* Instructor Info */}
                <Td className="flex flex-1 gap-x-2">
                  <img
                    src={instructor.image}
                    alt={`${instructor.firstName} ${instructor.lastName}`}
                    className="h-[150px] w-[150px] rounded-full"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-base font-bold capitalize text-richblack-5">
                      {instructor.firstName} {instructor.lastName}
                    </p>
                    <p className="text-sm">{instructor.email}</p>
                    <p>Gender: {instructor.additionalDetails?.gender || "Not Defined"}</p>
                    <p>Mobile No: {instructor.additionalDetails?.contactNumber || "No Data"}</p>
                    <p>DOB: {instructor.additionalDetails?.dateOfBirth || "No Data"}</p>
                  </div>
                </Td>

                {/* Status */}
                <Td className="mr-[11.5%] text-sm font-medium text-richblack-100">
                  {instructor.active ? "Active" : "Inactive"}
                </Td>

                {/* Approval */}
                <Td className="mr-[8%] text-sm font-medium text-richblack-100">
                  {instructor.approved ? "Approved" : "Not Approved"}
                </Td>
              </Tr>

              {/* Courses */}
              {instructor.courses && instructor.courses.length > 0 ? (
                <Tr className="flex gap-x-10 px-6 pb-5">
                  <p className="text-yellow-50">Built Courses</p>
                  <div className="grid grid-cols-5 gap-y-5">
                    {instructor.courses.map((course) => (
                      <div className="text-white text-sm" key={course._id}>
                        <p>{course.courseName}</p>
                        <p className="text-sm font-normal">Price: ₹{course.price}</p>
                      </div>
                    ))}
                  </div>
                </Tr>
              ) : (
                <div className="px-6 text-white mb-4">Not Purchased any course</div>
              )}
            </div>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default AllInstructors;
