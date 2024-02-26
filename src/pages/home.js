import { useState } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = ()=>
{
    const [students,setStudents] = useState([]);

    const ListInsert = (json_response)=>{
        let flag = 0;
        for(let i=0;i<students.length;i++){
            if(students[i]["_id"] === json_response["_id"])
            {
                flag=1;
                break; 
            }
        }
        if(flag===0)
            setStudents([...students, json_response]);
        else
            console.log("Duplicate Element");
    }
    const ListDelete = (index)=>{
        students.pop(index);
        console.log("POP");
    }
    const fetchDetails = async (reg)=>
    {
        const response = await fetch("https://attendencesystembackend.onrender.com/search/"+reg);
        if(response.ok)
        {
            const json_response = await response.json();
            console.log(JSON.stringify(json_response));
            //const newItem = {"_id" : "1", "name":"a","counsellor":"b","register_no":"123"};
            //setStudents([...students, json_response]);
            ListInsert(json_response);
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
                        Array.isArray(students) && students.map((student,index) => (
                                    <tr key={index}>
                                        <td  >{student.Register_no}</td>
                                        <td >{student["NAME"]}</td>
                                        <td >{student["D/H"]}</td>
                                        <td >{student["M/F"]}</td>
                                        <td ><button >Remove</button></td>
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