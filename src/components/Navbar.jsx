import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-700 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>{/*ya jsut the transition make the smooth transition of any thing applied to it */}
        <li className='cursor-pointer hover:font-bold transition-all'>Our Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
