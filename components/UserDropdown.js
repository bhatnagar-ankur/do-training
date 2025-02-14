import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import Link from 'next/link';

const UserDropdown = ({ user, handleLogout }) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button>
    
      <FaUserCircle className="w-8 h-8 rounded-full cursor-pointer text-white" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <Link href="/my-profile" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
               My Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button onClick={handleLogout} className={`${active ? 'bg-gray-100' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}>
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default UserDropdown;
