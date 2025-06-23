import { Link } from "react-router-dom"
import Appbar from "../components/Appbar"

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Appbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your thoughts, stories, and ideas — shared with the world.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to WhiteSpace — a space for writers, thinkers, and readers.
            Start publishing your voice or discover meaningful content from people like you.
          </p>
          <Link to="/signup">
            <button
              type="button"
              className="mt-8 bg-black text-white hover:bg-gray-900 font-semibold rounded-md px-6 py-3 text-md"
            >
              Get Started
            </button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Write Your Story</h2>
            <p className="text-gray-600">
              Create rich blog posts using an intuitive editor. Your words matter — let them reach the right audience.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Discover New Ideas</h2>
            <p className="text-gray-600">
              Explore a wide range of topics from tech, business, lifestyle, and personal growth — all in one place.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Connect with Readers</h2>
            <p className="text-gray-600">
              Engage with a community of readers who appreciate thoughtful, authentic content.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default GetStarted
