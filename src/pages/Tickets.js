import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../pages/styles.css";
import SideBar from "../components/Sidebar/SideBar";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const todosPerPage = 10;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }


  const todosData = useMemo(() => {
    let computedTodos = todos;

    if (searchTerm) {
        computedTodos = computedTodos.filter(
            todo =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filterCompleted === "true") {
      computedTodos = computedTodos.filter(
          todo =>
          filterCompleted === "true" && todo.completed === true
      )
  }

  if (filterCompleted === "false") {
    computedTodos = computedTodos.filter(
        todo =>
        filterCompleted === "false" && todo.completed === false
    )
  }

    setTotalTodos(computedTodos.length);

    //Current Page slice
    return computedTodos.slice(
        (currentPage - 1) * todosPerPage,
        (currentPage - 1) * todosPerPage + todosPerPage
    );
}, [todos, currentPage, searchTerm, filterCompleted]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearchTerm("");
    setFilterCompleted("");
    setCurrentPage(1);
  };
  const data = [
    {
      id: 1,
      Reason: "Takedown",
      CreatedAt: "23-06-2023",
      Status: "Conform",
    },
    {
      id: 2,
      Reason: "Takedown",
      CreatedAt: "23-06-2023",
      Status: "Conform",
    },
  
    {
      id: 3,
      Reason: "Takedown",
      CreatedAt: "23-06-2023",
      Status: "Conform",
    },
  
  
  ];
  
  return (
    <div className="mai-nev">
    <h3 className="catalogs">Tickets</h3>
    <div style={{position:'absolute',marginLeft:'15%', marginTop:'5%',fontSize:'150%'}}>
    {/* <input  type="text" placeholder="Search hear"></input> */}
    {/* <select style={{position:'absolute',marginLeft:'2%',fontSize:'130%'}}
      // value={this.state.selectValue} 
      // onChange={this.handleChange} 
    >
     <option value="Orange">All</option>
      <option value="Radish">A</option>
      <option value="Cherry">B</option>
    </select> */}
    {/* <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="search"
        placeholder="Search Title"
        // value={searchTerm}
        // onChange={(e) => {
        //   setSearchTerm(e.target.value);
        //   setCurrentPage(1);
        // }}
      />
    </div> */}
    <div style={{position:'absolute',marginLeft:'2%',top:'0%', width:'40%'}}>
      <select
        className="form-select"
        // value={filterCompleted}
        // onChange={(e) => {
        //   setFilterCompleted(e.target.value);
        //   setCurrentPage(1);
        // }}
      >
        <option defaultValue="All">All</option>
        <option value="true">Done</option>
        <option value="false">Pending</option>
      </select>
    </div>

    <h4 style={{position:'relative',marginLeft:'400%',marginTop:'10%',fontSize:'130%'}}>Total&nbsp;Tickets:3</h4>
    {/* <p>{message}</p> */}
    
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Reason</th>
          <th>Created At</th>
          <th>Status</th>
 
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            {/* <td><input type="checkbox"></input></td> */}
            <td>{item.Reason}</td>
            <td>{item.CreatedAt}</td>

            <td>
              <button type="submit" className="btn btn-primary">
                Done
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    // <div className="container">
    //   <h3>Filters</h3>
    //   <div className="mb-3">
    //     <label htmlFor="search" className="form-label">
    //       Search
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="search"
    //       placeholder="Search Title"
    //       value={searchTerm}
    //       onChange={(e) => {
    //         setSearchTerm(e.target.value);
    //         setCurrentPage(1);
    //       }}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="search" className="form-label">
    //       Completed
    //     </label>
    //     <select
    //       className="form-select"
    //       value={filterCompleted}
    //       onChange={(e) => {
    //         setFilterCompleted(e.target.value);
    //         setCurrentPage(1);
    //       }}
    //     >
    //       <option defaultValue="All">All</option>
    //       <option value="true">true</option>
    //       <option value="false">false</option>
    //     </select>
    //   </div>
    //   <div className="mb-3">
    //     <button
    //       type="button"
    //       className="btn btn-danger btn-sm"
    //       onClick={resetFilter}
    //     >
    //       Reset Filters
    //     </button>
    //   </div>

    //   <nav>
    //     <ul className="pagination">
    //       {pageNumbers.map((number) => (
    //         <li key={number} className="page-item">
    //           <button onClick={() => paginate(number)} className="page-link">
    //             {number}
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   </nav>

    //   {todosData
    //     .map((todo) => {
    //       return (
    //         <div key={todo.id} className="maincard">
    //           <h5 className="card-header">
    //             {/* <div className="card-header-flex">
    //               <span className="id">{`#${todo.id}`}</span>
    //             </div> */}
    //           </h5>
    //           <div className="card-body">
    //             <div className="card-text">
    //               <div className="card-body-flex">
    //                 <span>{`Title: ${todo.title}`}</span>
    //                 <span>{`Completed: ${todo.completed}`}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    // </div>
  );
}