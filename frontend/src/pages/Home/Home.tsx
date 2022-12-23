import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {GetUpcomingTodo} from "../../redux/Todo-reducer";
import UserInfoElement from "../../components/Home/UserInfoElement";
import WorkspaceAndTodoElement from "../../components/Home/WorkpaceAndTodoElement";
import greetingImg from '../../assets/img/greeting.jpg'
import greetingDeskImg from '../../assets/img/greeting-desk.png'
import greetingWindowImg from '../../assets/img/greeting-window.png'
import greetingElem2Img from '../../assets/img/greeting-elem2.png'
import greetingElem1Img from '../../assets/img/greeting-elem1.png'
import greetingRightPersImg from '../../assets/img/greeting-elem4.png'
import greetingLeftPersImg from '../../assets/img/greeting-elem5.png'
import greetingChartImg from '../../assets/img/greeting-elem3.png'
import mockupTodo from '../../assets/img/mockup.png'
import mockupWorkspace from '../../assets/img/mock_2.jpg'
import mockupStyle from '../../assets/img/mock_1.jpg'
import {useNavigate} from "react-router-dom";
import {UserType} from "../../redux/Auth-reducer";

interface HomePageProps {
    isAuth: boolean,
    user:UserType
}


const HomePage = ({isAuth,user}: HomePageProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        isAuth? document.title = `Welcome ${user.fullName}`:  document.title = 'Do it: task manager'
    }, [isAuth]);


    return (
        <section className="main-page">
            {isAuth ?
                <div className="main-page__container">
                    <UserInfoElement/>
                    <WorkspaceAndTodoElement/>
                </div>
                :
                <>
                    <div className="center-container">
                        <div className='main-page__greeting'>Organize the work.</div>
                        <div className='main-page__sub-greeting'>Do IT - task manager, will help to monitor all
                            production processes
                        </div>
                        <div className='main-page__login' onClick={() => navigate('/signup')}>Start using</div>
                    </div>
                    <div>
                        <img src={greetingImg} alt="" className='main-page__img-greeting'/>
                        <img src={greetingRightPersImg} alt="" className='main-page__img-greeting pers-img'/>
                        <img src={greetingLeftPersImg} alt="" className='main-page__img-greeting pers-img'/>
                        <img src={greetingChartImg} alt="" className='main-page__img-greeting chart-img'/>
                        <img src={greetingElem1Img} alt="" className='main-page__img-greeting elem1-img'/>
                        <img src={greetingElem2Img} alt="" className='main-page__img-greeting elem2-img'/>
                        <img src={greetingWindowImg} alt="" className='main-page__img-greeting window-img'/>
                        <img src={greetingDeskImg} alt="" className='main-page__img-greeting desk-img'/>
                    </div>
                    <div className='main-page__greeting-about'>
                        <div className='medium-title'>Join us</div>
                        <div className='small-title sub main-page__greeting-about-title'>Share your tasks and speed up the development process</div>
                        <div className='main-page__greeting-about-msg'>
                            <img src={mockupWorkspace} alt="" className='imgi'/>
                            <div className='small-title sub'>Add tasks, share them with other users, change task statuses by simply dragging and dropping</div>
                        </div>
                        <div className='main-page__greeting-about-msg'>
                            <div className='small-title sub'>You can add subtasks, comments to tasks, end time, attach files and much more</div>
                            <img src={mockupTodo} alt="" className='imgi'/>
                        </div>
                        <div className='main-page__greeting-about-msg'>
                            <img src={mockupStyle} alt="" className='imgi'/>
                            <div className='small-title sub'>for a more enjoyable experience, you can also customize your work interface</div>
                        </div>
                        <div className='small-title sub'>
                            <span>View project on: </span>
                            <a href="https://github.com/Amovet/do-IT-todo-app" target='_blank' className='underline'>Github</a>
                        </div>
                    </div>
                </>
            }

        </section>
    );
}


const mapStateToProps = (state: any) => ({
    isAuth: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user
})

export default connect(mapStateToProps, {GetUpcomingTodo})(HomePage);