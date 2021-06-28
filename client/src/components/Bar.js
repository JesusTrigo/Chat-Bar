import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";



const Bar = () => {

    const { id } = useParams();

    const [bar, setBar] = useState();

    useEffect(() => {
        const getBar = async () => {
            const response = await axios(`http://localhost:5000/bares/find/${id}`,
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2I2OWVmN2FiMjgwMmM2ODIyNjExZSIsImlhdCI6MTYyNDY1NDY5OSwiZXhwIjoxNjI2NzI4Mjk5fQ.cxqYaxX61j03dq6oCoLj6C7pBi-ts9qsf9uJLHbv20c"
                    }
                })
            console.log(response)
            setBar(response.data.bar)

        };
        getBar();

    }, [id]);



    return (
        <div>

            {bar &&
                <div>
                    <p>{bar.name}</p>
                    <p>{bar.city}</p>
                    <ul>
                        {bar.users.map((user, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/perfil/${user._id}/${id}`} >
                                        <p>{user.username}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>}

        </div>
    );
};



export default Bar;



// {/* <ul>
//                 {bar.map((user, i) => {
//                     return (
//                         <li key={i}>
//                             {user}
//                         </li>
//                     )
//                 })}
//             </ul> */}
// {/* <p key={bar.users}>{bar.users.map(bar => {
//                 return (
//                     <div>
//                         <p>{bar.username + " " + bar.age + " " + bar.gender}</p>
//                     </div>
//                 )
//             })}</p> */}

// // .map(bar => {
// //     return (
// //         <Link key={bar._id} to={`/bares/${bar._id}`} >
// //             <p>{bar.name}</p>
// //         </Link>
// //     )
// // })

// // {for (let i= 0; i < bar.users.length; i++) {
// //     return (
// //         <p>{bar.users[i].username}</p>
// //     )
// // }}
