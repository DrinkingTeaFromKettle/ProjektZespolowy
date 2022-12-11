import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../services/ContextProvider';
import DepartmentService from "../../services/department.service.js";
import Pagination from "../../components/Pagination.jsx";
import { useNavigate, useLocation} from 'react-router-dom';

const ShowActivities = () => {

  const [departments, setDepartments] = useState([])
  const [filteredDeps, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDeps.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredDeps.length / recordsPerPage);
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const [search, setSearch] = useState('')
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : "");
  const [successful, setSuccessful] = useState(location.state ? location.state.successful : false);


  function handleAddDepartment(){
    navigate("/departments/add");
  }

  function HandleSearch(){
    if(search === ""){
      setFiltered(departments);
      setCurrentPage(1);
    } else {
    setFiltered(departments.filter(dep => dep.name.toLowerCase().includes(search.toLowerCase())));
    setCurrentPage(1);
    }
  }

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  useEffect(() => {
    DepartmentService.showDepartments().then(
      (response) => {
        console.log(response.data)
        setDepartments(response.data);
        setFiltered(response.data);
      },
      (error) => {
        const _error =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_error);
      }
    );
  }, []);


  function editDepartmentHandler(id) {
    navigate('/departments/edit/' + id)
  }
  function deleteDepartmentHandler(id) {
    setMessage("");
    setSuccessful(false);


    DepartmentService.deleteDepartment(id).then(
      () => {
        navigate('/departments', { state: { message: "Successfully deleted department.", successful: true } });
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }

    );
  }
  return (
    <div className='flex gap-10 flex-wrap justify-center min-h-screen'>
      <div className="p-11 mb-20 flex-grow ">
        <h1 className="mb-8 text-center text-3xl font-semibold">Lista Wydziałów</h1>
          <div className=' grid grid-cols-3'>
            <div className="flex items-center input-group  d-flex justify-content-between">
              <input className="form-control p-3 shadow-md  rounded-l-lg w-4/5" 
                type="search" 
                placeholder="Search"
                value={search}
                onChange={onChangeSearch}
              />
              <button className="p-4 mr-2 shadow-md  rounded-r-lg text-white bg-blue-400  hover:bg-blue-600"  onClick={()=>{HandleSearch()}}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>
            <div className='col-span-2 flex justify-end'>
              <button onClick={handleAddDepartment} className="p-4 shadow-xl m-2 rounded-lg border-1 hover:bg-gray-600 hover:text-white">
                Dodaj  Wydział
              </button>
            </div>
          </div>
          <hr />
          {message && (
            <div
              className={
                successful ? "m-2 text-green-500 font-medium" : "m-2 text-red-500 font-medium"
              }
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="pt-5 grid gap-x-2">
            {
              currentRecords.length > 0 
              && (
                currentRecords.map(dep => (
                  <>
                    <div className="grid grid-cols-6 border-2 rounded-lg p-3 pt-6 pb-6 shadow-md m-2 bg-white dark:bg-secondary-dark-bg dark:border-gray-700" key={dep.id}>
                    <div className="col-span-2 break-all flex items-center p-1">{dep.name}</div>
                    <div className="col-span-3 flex p-1 items-center break-words">{dep.description}</div>
                      <div className=" flex justify-end items-center pr-2">
                        <div className={screenSize <= 1200 ? 'flex flex-col' : 'flex flex-row'}>
                        <button onClick={() => editDepartmentHandler(dep.id)} className=" p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black ">
                          Edytuj
                        </button>
                          <button onClick={() => deleteDepartmentHandler(dep.id)} className="flex text-center items-center justify-center p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
              )))}
              {
                currentRecords.length === 0 &&
                <h1  className="mb-8 text-center text-2xl text-stone-800 font-semibold"> There are no departments to display.</h1>
              }
            </div>
              {nPages > 1  && 
                <div className='flex justify-center mt-5'>
                  <Pagination
                    nPages = { nPages }
                    currentPage = { currentPage } 
                    setCurrentPage = { setCurrentPage }
                  />
                </div>
              }
      </div>
    </div>
  );
}

export default ShowActivities;
