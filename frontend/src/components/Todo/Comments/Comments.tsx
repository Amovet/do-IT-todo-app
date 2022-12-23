import React, {useState} from "react";
import {connect} from "react-redux";
import {
    AddComment,
    DeleteComment,
} from "../../../redux/Todo-reducer";
import commentIco from "../../../assets/img/comment-ico.svg"
import send from '../../../assets/img/send.svg'
import {intervalToDuration} from "date-fns";

interface CommentsInitial{
    comments:Array<object>,
    AddComment:(text:string)=>void,
    DeleteComment:(url:string)=>void,
    userId:string
}

function CommentElement({comments,AddComment,DeleteComment,userId}:CommentsInitial){
    const [commentView, setCommentView] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [viewAllComment, setViewAllComment] = useState(false);

    let SinceCommentCreationsTime=(createAt:string)=>{
        let SinceCreationsTime
        let CommentTime = 'just now'
        SinceCreationsTime = intervalToDuration({
            start: new Date(createAt),
            end: new Date()
        })
        if(SinceCreationsTime.minutes!==undefined && SinceCreationsTime.days!==undefined && SinceCreationsTime.months!==undefined){
        if(SinceCreationsTime.minutes>0){CommentTime =`${SinceCreationsTime.minutes} minutes ago`}
        else{CommentTime =`just now`}
        if(SinceCreationsTime.days>0){CommentTime =`${SinceCreationsTime.days} days ago`}
        if(SinceCreationsTime.months>0){CommentTime =`${SinceCreationsTime.months} months ago`}
        }
        return CommentTime
    }

    let pushToAddComment = (Text:string) => {
        AddComment(Text);
        setCommentText('')
    }



    return(
            <div className="main-block__comment-container comment-container">
                <div className="comment-container__title small-title ">Comments</div>
                {comments.length > 0 ?
                    <>
                        {comments.map((e: any) =>
                            <div className='comment-container__item' key={e._id}>
                                <div className='comment-container__img'>
                                    {
                                        e.user.avatarUrl == undefined || e.user.avatarUrl == '' ?
                                            <div>{e.user.fullName.substring(0, 1)}</div>
                                            :
                                            <img src={e.user.avatarUrl} alt=""/>
                                    }
                                </div>
                                <div className='comment-container__content content'>
                                    <div className="content__title">
                                        <div>{e.user.fullName}</div>
                                        {userId==e.user.userId?
                                            <div className='exit-container' onClick={() => DeleteComment(e._id)}>
                                                <div className='exit'/>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="content__content">
                                        {e.text.length > 200 ?
                                            <>  {viewAllComment == e._id ?
                                                <>
                                                    {e.text} <span
                                                    onClick={() => setViewAllComment(false)}>Hide all</span>
                                                </>
                                                :
                                                <>
                                                    {e.text.substring(0, 200)}... <span
                                                    onClick={() => setViewAllComment(e._id)}>View all</span>
                                                </>
                                            }

                                            </>
                                            :
                                            <>{e.text}</>
                                        }
                                        <div className='comment-container__time sub'>
                                            <>{SinceCommentCreationsTime(e.createdAt)}</>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="comment-container__create">
                            <input type="text" value={commentText} onChange={(e: any) => setCommentText(e.target.value)}
                                   placeholder="Enter a comment"
                                   onKeyDown={(e: any) => e.keyCode == 13 ? pushToAddComment(commentText) : null}/>
                            <div className="comment-container__add" onClick={() => pushToAddComment(commentText)}>
                                <img src={send} alt=""/>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {commentView ?
                            <>
                                <div className='comment-container__ready'>
                                    <img src={commentIco} alt="" className='comment-is-empty'/>
                                    <span className='main-block__comment-info'>It remains only to add a comment</span>
                                </div>
                                <div className="comment-container__create">
                                    <input type="text" value={commentText}
                                           onChange={(e: any) => setCommentText(e.target.value)}
                                           placeholder="Enter a comment"
                                           onKeyDown={(e: any) => e.keyCode == 13 ? pushToAddComment(commentText) : null}/>
                                    <div className="comment-container__add" onClick={() => pushToAddComment(commentText)}>
                                        <img src={send} alt=""/>
                                    </div>
                                </div>
                            </>
                            :
                            <div className='comment-container__is-empty'
                                 onClick={() => setCommentView(true)}>
                                <img src={commentIco} alt="" className='comment-is-empty'/>
                                <span
                                    className='main-block__comment-info'>There are no comments yet, click to add</span>
                            </div>
                        }
                    </>
                }
            </div>
    )
}

const mapStateToProps = (state:any) =>({
    comments:state.TodoReducer.comments,
    userId:state.AuthReducer.user._id
})


export default connect(mapStateToProps, {AddComment,DeleteComment})(CommentElement);;