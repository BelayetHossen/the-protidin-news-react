import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

import UserAvatar from '../images/user-avatar-32.png';
import axios from 'axios';
import { SiteContext } from '../website/context/ContextProvider';
import { toast } from 'react-toastify';

function DropdownProfile({ align }) {
  const { MAIN_URL, loading, setLoading, loggedinAdmin } = useContext(SiteContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });





  // logout system
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const response = await axios.get(`${MAIN_URL}/api/admin/loggedin`, { headers });
      if (response.data.code === 201) {
        toast.success(response.data.message);
        localStorage.removeItem('_token');
        window.location.href = '/admin/login';
      } else if (response.data.code === 422) {
        toast.warning(response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {
          loggedinAdmin?.photo ? <img className="w-8 h-8 rounded-full" src={MAIN_URL + "/images/admins/" + loggedinAdmin?.photo} width="32" height="32" alt="User" /> : <img className="w-8 h-8 rounded-full" src={MAIN_URL + "/images/admin.png"} width="32" height="32" alt="User" />
        }

        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{loggedinAdmin?.fname}</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
            <div className="font-medium text-slate-800 dark:text-slate-100">{loggedinAdmin?.fname} {loggedinAdmin?.lname}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">{loggedinAdmin?.get_role?.name}</div>
          </div>
          <ul className='ps-2'>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1"
                to={`/dashboard/admin/edit/${loggedinAdmin?.id}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              ><i className="fas fa-cog mr-2"></i>
                Settings
              </Link>
            </li>
            <li>
              <a onClick={handleLogout} className="" href="#"><i className="fas fa-sign-out-alt mr-2"></i>
                Logout</a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;