import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLoading from "react-loading";
import './home.css';

const Home = ()=>
{
    const storedAttendanceData = localStorage.getItem('attendanceData') ;
    //console.log(storedAttendanceData);
    const [students,setStudents] = useState(storedAttendanceData!=undefined?JSON.parse(storedAttendanceData):[]);
    const [loading, setLoading] = useState(false);
    // Load attendance data from local storage when the component mounts
    useEffect(() => {
        const local = localStorage.getItem('attendanceData');
        console.log(local);
        if(local == undefined)
        {
            console.log("No old data");
        }
        else
        {
            const storedAttendanceData = JSON.parse(local);
            if (storedAttendanceData) {
                setStudents(storedAttendanceData);
            }
            console.log(storedAttendanceData);
        }
    }, []);

    // Save attendance data to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('attendanceData', JSON.stringify(students));
        console.log("Local Storage Added");
        const storedAttendanceData = JSON.parse(localStorage.getItem('attendanceData'));
        console.log(storedAttendanceData);

    }, [students]);

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
        students.splice(index,1);
        setStudents([...students]);
        console.log("POP : "+index+JSON.stringify(students));
    }
    const fetchDetails = async (reg)=>
    {
        setLoading(true);
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
        setLoading(false);
    
    }
    const handler = (e)=>
    {
        e.preventDefault();
        const reg = document.getElementById("reg").value;
        console.log(students);
        fetchDetails(reg);
        document.getElementById("reg").value = Math.floor(reg/1000);

    }
    
    return(
        <div>
        <div className="title"><h1>Enter the Absentees</h1><br/></div>  
        <div>
        <form style={{padding:"20px"}} onSubmit={handler}>
            <label style={{padding:"20px"}}> Enter the register_no : 
                <input id="reg" type="number"/>
            </label>
            <label style={{padding:"20px"}}> Year : 
                <input id="year" type="number"/>
            </label>    
            <label style={{padding:"20px"}}> Section : 
                <input id="sec" type="text"/>
            </label>
            <input id = "submit" type="submit"/>
        </form>
        </div>
        <div className="studentTable">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th >Register No.</th>
                        <th >Name</th>
                        <th >D/H</th>
                        <th >M/F</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            loading==false ? (
                        Array.isArray(students) && students.map((student,index) => (
                                    <tr key={index}>
                                        <td  >{student.Register_no}</td>
                                        <td >{student["NAME"]}</td>
                                        <td >{student["D/H"]}</td>
                                        <td >{student["M/F"]}</td>
                                        <td ><button onClick={() => { ListDelete(index) }}>Remove</button></td>
                                    </tr>
                                    
                        ))
                            ) : <tr><td><ReactLoading type="cylon" color="#0000FF"
                            height={100} width={100} /></td></tr>
                        }
                    </tbody>
                </Table>
        </div>
        </div>
        
    );
};

export default Home