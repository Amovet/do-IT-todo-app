import React from "react";
import {useNavigate} from "react-router-dom";
import erorIco from '../../assets/img/404.gif'


function Eror(){

    const navigate = useNavigate();

    return(

        <section className='eror'>
            <div className='eror__container'>
                <img src={erorIco} alt=""/>
                <div className='small-title'>
                    OOPS, something went wrong
                </div>
                <div className='buttons bg-gray-light' onClick={() => navigate('/')}>Go to main page</div>

            </div>
        </section>

    )
}


export default Eror;