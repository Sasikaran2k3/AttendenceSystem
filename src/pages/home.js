import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = ()=>
{
    const [students,setStudents] = useState([]);

    const fetchDetails = async (reg)=>
    {
        const response = await fetch("/search/"+reg, {mode:'cors'});
        if(response.ok)
        {
            const json_response = await response.json();
            console.log(JSON.stringify(json_response));
            //const newItem = {"_id" : "1", "name":"a","counsellor":"b","register_no":"123"};
            setStudents([...students, json_response]);
            console.log("Inner "+ students);
        }
        else
            console.log("Fetch Error");
    
    }
    const handler = (e)=>
    {
        e.preventDefault();
        const reg = document.getElementById("reg").value;
        console.log(students);
        fetchDetails(reg);
    }
    
    return(

        <div>
        <div className="title"><h1>Enter the Absentees</h1><br/></div>  
        <div>
        <form style={{padding:"20px"}} onSubmit={handler}>
            <label style={{paddingTop:"20px"}}> Enter the register_no : 
                <input id="reg" type="number"/>
            </label>
        </form>
        </div>
        <div className="studentTable">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th >register_no</th>
                        <th >Name</th>
                        <th >D/H</th>
                        <th >M/F</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                        Array.isArray(students) && students.map((student) => (
                                    <tr key={student.Register_no}>
                                        <td  >{student.Register_no}</td>
                                        <td >{student["NAME"]}</td>
                                        <td >{student["D/H"]}</td>
                                        <td >{student["M/F"]}</td>
                                    </tr>
                        ))
                        }
                    </tbody>
                </Table>
        </div>
        </div>
        
    );
};

export default Home