import React from 'react'

function SearchModal() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      placeholder="Search..."
    />
  </div>
  )
}

export default SearchModal
