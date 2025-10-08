import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Course_Slider from "../components/core/Catalog/Course_Slider"
import Loading from './../components/common/Loading';
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories } from './../services/operations/courseDetailsAPI';

function Catalog() {
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseCategories();
        const category_id = res.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id
        setCategoryId(category_id || "")
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        setLoading(true)
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      })()
    }
  }, [categoryId])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loading />
      </div>
    )
  }

  if (!loading && !catalogPageData) {
    return (
      <div className="text-white text-2xl sm:text-4xl flex justify-center items-center mt-40">
        No Courses found for selected Category
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-900 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-7xl flex-col justify-center gap-4 py-8 lg:py-12">
          <p className="text-sm text-gray-400">
            Home / Catalog / <span className="text-yellow-400">{catalogPageData?.selectedCategory?.name}</span>
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
            {catalogPageData?.selectedCategory?.name}
          </h1>
          <p className="max-w-2xl text-gray-300">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Courses to get you started</h2>
        <div className="flex border-b border-gray-700 text-sm mb-6">
          <p
            className={`px-4 py-2 ${active === 1 ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-100"} cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${active === 2 ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-100"} cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <Course_Slider Courses={catalogPageData?.selectedCategory?.courses} />
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Top courses in {catalogPageData?.differentCategory?.name}
        </h2>
        <Course_Slider Courses={catalogPageData?.differentCategory?.courses} />
      </div>

      {/* Section 3 */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8">Frequently Bought</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {catalogPageData?.mostSellingCourses?.slice(0, 4).map((course, i) => (
            <Course_Card course={course} key={i} Height="h-72" />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
