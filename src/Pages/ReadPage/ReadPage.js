import React from 'react'
import { useState } from 'react';
import PrimaryBtn from '../../Components/Buttons/SecondaryBtn';
import {SayButton} from 'react-say';

export default function ReadPage() {
    const [currPage, setCurrPage] = useState([{
        page : 1,
        content : "Something tells me this is a good project captain ! Number 1"
    },
    {
        page : 2,
        content : "Something tells me this is a good project captain ! Number 2"
    },
    {
        page : 3,
        content : "Something tells me this is a good project captain ! Number 3"
    }]);

    const [pageIndex, setPageIndex] = useState(1);

    const getText = () => {
        const findContent = (element) => {
            return element.page === pageIndex;
        };

        let element = currPage.find(findContent);
        return <div>{element.content}</div>
    }
    
    // 0 not reading, 1 is Reading, 2 is Paused
    const [etat, setEtat] = useState(1); 
    
    // const read = () => {

    //     if(etat === 0){
    //         console.log("zbiiii")
    //         console.log(etat)
    //         return   <Say
    //         pitch={ 1.1 }
    //         rate={ 1.5 }
    //         speak={currPage[pageIndex - 1].content}
    //         volume={ 0.8 }
    //         text={currPage[pageIndex - 1].content}
    //     />
    //     }

    //     else {

    //         return "";
    //     }
    // }

    return (
        <div>
            {getText()}        
            {/* {read()} */}
            <SayButton
                onClick={ event => console.log(event) }
                speak={currPage[0].content}
                text={currPage[0].content}
            >
                Read
            </SayButton>
            {/* { etat === 0  */}
            {/* <PrimaryBtn text="Read" click={() => {setEtat(0)}}/>  */}
            {/* // : <PrimaryBtn text="Pause" click={()=>{setEtat(1)}}/> } */}
        </div>
    )
}
