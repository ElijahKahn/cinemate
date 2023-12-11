import { Pagination } from "@mui/material";


function Paging({ setPage, numOfPages = 10 }) {

   
    const handlePageChange = (page) => {
        setPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
      };

    return (
        <div>
           <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
    </div>
    <br/>
        </div>
    );
}
export default Paging;