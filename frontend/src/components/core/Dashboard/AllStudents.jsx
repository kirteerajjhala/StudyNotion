import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllStudentsData } from "../../../services/operations/adminApi";
import { Table, Th, Thead, Tr, Td, Tbody } from "react-super-responsive-table";
import IconBtn from "../../common/IconBtn";
import { VscAdd } from "react-icons/vsc";
import user_logo from "../../../assets/Images/user.png";

// Loading skeleton component
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

const AllStudents = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allStudents, setAllStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch all students data
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        setLoading(true);
        const { allStudentsDetails, studentsCount } = await getAllStudentsData(token);
        setAllStudents(allStudentsDetails || []);
        setStudentsCount(studentsCount || 0);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, [token]);

  return (
    <div>
      {/* Header */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          All Students Details
        </h1>
        <IconBtn text="Add Students" onclick={() => navigate("/admin/add-student")}>
          <VscAdd />
        </IconBtn>
      </div>

      {loading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : allStudents.length === 0 ? (
        <div className="text-5xl py-5 bg-yellow-800 text-white text-center">
          No Data Available
        </div>
      ) : (
        <Table className="rounded-xl border-2 border-richblack-500">
          <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-2 border-b-richblack-500 px-6 py-2">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Students: {studentsCount}
              </Th>
              <Th className="mr-[10%] text-center ml-4 text-sm font-medium uppercase text-richblack-100">
                ACTIVE
              </Th>
              <Th className="mr-[7%] text-sm font-medium uppercase text-richblack-100">
                APPROVED
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {allStudents.map((student) => (
              <div key={student._id} className="border-x border-2 border-richblack-500">
                <Tr className="flex gap-x-10 px-6 py-8">
                  {/* Student Info */}
                  <Td className="flex flex-1 gap-x-2">
                    <img
                      src={student.image !== "/" ? student.image : user_logo}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="h-[150px] w-[150px] rounded-full"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-bold text-richblack-5">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm">{student.email}</p>
                      <p>Gender: {student.additionalDetails?.gender || "Not Defined"}</p>
                      <p>Mobile No: {student.additionalDetails?.contactNumber || "No Data"}</p>
                      <p>DOB: {student.additionalDetails?.dateOfBirth || "No Data"}</p>
                    </div>
                  </Td>

                  {/* Status */}
                  <Td className="mr-[11.5%] text-sm font-medium text-richblack-100">
                    {student.active ? "Active" : "Inactive"}
                  </Td>

                  {/* Approval */}
                  <Td className="mr-[8%] text-sm font-medium text-richblack-100">
                    {student.approved ? "Approved" : "Not Approved"}
                  </Td>
                </Tr>

                {/* Courses */}
                {student.courses && student.courses.length > 0 ? (
                  <Tr className="flex gap-x-10 px-6 pb-5">
                    <p className="text-yellow-50">All Enrolled Courses</p>
                    <div className="grid grid-cols-5 gap-y-5">
                      {student.courses.map((course) => (
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
      )}
    </div>
  );
};

export default AllStudents;
