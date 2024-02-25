import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const my_style = {
    alignItems: 'center',
    justifyContent: 'center',
}


const Home = ()=>
{
    const [students,setStudents] = useState([]);

    const fetchDetails = async (reg)=>
    {
        const response = await fetch("/search/"+reg);
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

        <div style={my_style}>
        <div className="title"><h1>Enter the Absentees</h1><br/></div>  
        <div>
        <form style={{paddingTop:"20px"}} onSubmit={handler}>
            <label> Enter the register_no : 
                <input id="reg" type="number"/>
            </label>
        </form>
        </div>
        <div className="studentTable">
                <table style={{border:"solid black",tableLayout: "fixed"}}>
                    <tr style={{border:"solid black"}}>
                        <th style={{border:"solid black"}}>register_no</th>
                        <th style={{border:"solid black"}}>Name</th>
                        <th style={{border:"solid black"}}>D/H</th>
                        <th style={{border:"solid black"}}>M/F</th>
                    </tr>
                        {
                        Array.isArray(students) && students.map((student) => (
                                <div>
                                    <tr key={student.Register_no}>
                                        <td  style={{border:"solid black",textAlign: "center"}}>{student.Register_no}</td>
                                        <td style={{border:"solid black"}}>{student["NAME"]}</td>
                                        <td style={{border:"solid black"}}>{student["D/H"]}</td>
                                        <td style={{border:"solid black",textAlign: "center"}}>{student["M/F"]}</td>
                                    </tr>
                                </div>
                        ))
                        }
                    
                </table>
        </div>
        </div>
        
    );
};

export default Home