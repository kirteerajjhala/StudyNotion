import { useEffect, useState } from "react";
import { createNewCategory, deleteCategory, fetchCourseCategories } from "../../../services/operations/courseDetailsAPI";
import IconBtn from '../../common/IconBtn';
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
    <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
    <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
    <div className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></div>
  </div>
);

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setCategories(res || []);
    } catch (error) {
      console.error("Could not fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create new category
  const handleCreateCategory = async () => {
    if (!newCategory || !description) return;

    try {
      await createNewCategory(newCategory, description, token);
      setNewCategory('');
      setDescription('');
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId, token);
      fetchCategories(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="border-[1px] border-richblack-700 rounded-2xl bg-richblack-800 p-8 sm:px-12">
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Create Category
      </h1>

      {/* Input & Add Button */}
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <div className="flex flex-col w-full gap-5">
          <input
            type="text"
            value={newCategory}
            placeholder="Enter new category name"
            onChange={(e) => setNewCategory(e.target.value)}
            className="text-white pl-4 w-full h-10 bg-transparent border-2 border-yellow-500 outline-none rounded-2xl focus:border-yellow-400"
          />
          <textarea
            value={description}
            placeholder="Enter description of category"
            onChange={(e) => setDescription(e.target.value)}
            className="text-white pl-4 w-full h-20 bg-transparent border-2 border-yellow-500 outline-none rounded-2xl focus:border-yellow-400 resize-none"
          />
        </div>

        <IconBtn
          text="Add"
          onclick={handleCreateCategory}
          disabled={!newCategory || !description}
        >
          <IoIosAdd />
        </IconBtn>
      </div>

      {/* Categories List */}
      <div className="mt-10 flex flex-col gap-6 text-white">
        {loading ? (
          <LoadingSkeleton />
        ) : categories.length === 0 ? (
          <p className="text-center text-yellow-50">No categories available.</p>
        ) : (
          categories.map((category, i) => (
            <div key={category._id || i} className="flex justify-between items-center gap-10 border-b border-richblack-700 py-2">
              <p>{category.name}</p>
              <button onClick={() => handleDeleteCategory(category._id)}>
                <RiDeleteBin6Line className="hover:text-pink-200 text-lg" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
