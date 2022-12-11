import React, { useEffect } from 'react';
import { AiOutlineMenu} from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { TbBellSchool,TbWheelchair } from 'react-icons/tb';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { BsPersonCircle, BsCalendar2CheckFill, BsFillChatFill } from 'react-icons/bs';
import { FaKey, FaDoorOpen } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';
import { CgBox } from 'react-icons/cg';
import { GiNotebook } from 'react-icons/gi';

import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { RiContactsBook2Fill, RiNewspaperFill } from 'react-icons/ri';
import { BiBookOpen } from 'react-icons/bi';
import { useStateContext } from '../services/ContextProvider';
import AuthService from '../services/auth.service';

import AccessabilitySettings from './AccessabilitySettings';
import logo from '../assets/logo.png'
const Sidebar = () => {

  const { currentColor, activeMenu, setActiveMenu, screenSize, setScreenSize, showEmployeeBoard, setShowEmployeeBoard, showAdminBoard, setShowAdminBoard, currentUser, setCurrentUser } = useStateContext();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowEmployeeBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };



  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <>
      {activeMenu ? (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
          <>
            <div className="flex justify-center items-center mt-5">
              <Link to="/" onClick={handleCloseSideBar} >
                <img src={logo} alt="Logo" className="h-20 md:h-28 lg:h-40" />
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className={`text-xl rounded-full p-3 hover:bg-light-gray mt-4 block" ${screenSize <= 900 ? null : "hidden"}`}
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <div className="mt-10 ">
              <p className="text-gray-400 m-3 mt-4 uppercase">
                <hr className='p-2'></hr>
                Autoryzacja
              </p>
              {currentUser ? (
                <>
                  <NavLink
                    to={`/chat`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<BsFillChatFill />}
                    <span className="capitalize ">Czat</span>
                  </NavLink>
                  <NavLink
                    to={`/profile`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<BsPersonCircle />}
                    <span className="capitalize ">Profil</span>
                  </NavLink>
                  <NavLink
                    to={`/`}
                    onClick={handleCloseSideBar && logOut}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<RiLogoutBoxRLine />}
                    <span className="capitalize ">Wyloguj</span>
                  </NavLink>

                </>
              ) : (

                <NavLink
                  to={`/login`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  {<FaKey />}
                  <span className="capitalize ">Zaloguj</span>
                </NavLink>

              )
              }
            </div>
            <div className="mt-10 ">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Informacje
              </p>
              <NavLink
                to={`/home`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<BsFillHouseDoorFill />}
                <span className="capitalize ">Strona główna</span>
              </NavLink>
              <NavLink
                to={`/about`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<BiBookOpen />}
                <span className="capitalize ">O&nbsp;nas</span>
              </NavLink>
              <NavLink
                to={`/contact`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<RiContactsBook2Fill />}
                <span className="capitalize ">Kontakt</span>
              </NavLink>
              <NavLink
                to={`/news`}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                {<RiNewspaperFill />}
                <span className="capitalize ">Aktualności</span>
              </NavLink>
            </div>

            <div className="mt-10 ">
              {currentUser ? (
                <><p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Akcje
                </p>
                  <NavLink
                    to={`/schedule`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<BsCalendar2CheckFill/>}
                    <span className="capitalize ">Harmonogram</span>
                  </NavLink>
                  <NavLink
                    to={`/booking`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<TbWheelchair />}
                    <span className="capitalize ">Wypożyczenia sprzętu</span>
                  </NavLink>
                  <NavLink
                    to={`/activities`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<TbBellSchool />}
                    <span className="capitalize ">Zajęcia</span>
                  </NavLink>
                  <NavLink
                    to={`/rooms`}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    {<FaDoorOpen />}
                    <span className="capitalize ">Pokoje</span>
                  </NavLink>

                  {showEmployeeBoard || showAdminBoard ?
                    <><NavLink
                      to={`/users`}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                      {<ImUsers />}
                      <span className="capitalize ">Użytkownicy</span>
                    </NavLink>
                      <NavLink
                        to={`/descriptions`}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        {<GiNotebook />}
                        <span className="capitalize ">Wpisy użytkowników</span>
                      </NavLink>
                      <NavLink
                        to={`/items`}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        {<CgBox />}
                        <span className="capitalize ">Sprzęt</span>
                      </NavLink>
                      <NavLink
                        to={`/departments`}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        {<HiOutlineBuildingOffice2 />}
                        <span className="capitalize ">Wydziały</span>
                      </NavLink>
                    </>
                    : null}



                </>)
                : null}
            </div>

          </>
          <AccessabilitySettings />
        </div>
      ) :

        (<NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />)}

    </>
  );
};

export default Sidebar;
