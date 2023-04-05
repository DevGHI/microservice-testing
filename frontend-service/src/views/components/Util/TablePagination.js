// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
  } from "reactstrap";
  import { useState, useEffect } from "react";
  // core components
  import Header from "components/Headers/Header.js";
  import { useHistory } from "react-router-dom";
  

  
  const TablePagination = (props) => {
    
    const {meta,setPage,page} = props;
  
    return (
      <>
           <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={page==1?'disabled':''}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page-1);
                        }}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    
                    {
                      meta?.total?Array(Math.ceil(meta.total/meta.perPage)).fill(null).map((item,index)=>(
                        <PaginationItem className={meta.page==(index+1)?'active':''} key={index}>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(index+1);
                            }}
                          >
                            {index+1}
                          </PaginationLink>
                        </PaginationItem>
                      )):''
                    }
                    
                    <PaginationItem className={page==Math.ceil(meta.total/meta.perPage)?'disabled':''}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page+1);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
            </CardFooter>
      </>
    );
  };
  
  export default TablePagination;
  