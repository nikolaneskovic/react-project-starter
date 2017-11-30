import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import PostDataService from "../../../services/postDataService";
import { error } from "util";



class PostOnFeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.postObj = this.props.post;
        this.getComponentByType = this.getComponentByType.bind(this);
        this.postDataService = new PostDataService();
        this.deleteButton = this.deleteButton.bind(this);
    }
    deleteButton() {
        this.postDataService.deleteSinglePost(this.props.post.id, response=>{
            this.props.refreshPage();
        }, error=>{
            console.log(error);
        });


    }
    getComponentByType(type) {
        if (type === "text") {
            return <p>{this.props.post.text}</p>;
        }
        if (type === "image") {
            return <img className="postImage" src={this.props.post.imageUrl} width="100%" />;
        }
        if (type === "video") {
            return <iframe width="800" height="400" src={this.props.post.videoUrl} frameBorder="0" allowFullScreen></iframe>;
        }

    }

    render() {
        return (
            <div className="row videoPost">
                <div className="col-9">
                    {this.getComponentByType(this.props.post.type)}
                </div>
                <div className="col-1 offset-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={this.deleteButton}>x</button>
                </div>
                <div className="col-12">
                    <div className="borderTop row">
                        <p className="col-4 typeOfPost">Author: {this.props.post.userDisplayName}</p>
                        <p className="col-4 typeOfPost">Comments: {this.props.post.commentsNum}</p>
                        <p className="col-4 linkBtn"><Link to={`/feed/${this.postObj.type}/${this.props.post.id}`}><img className="linkImg" src="../../../img/linkBtn.png" width="50px" height="50px" /></Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

PostOnFeedPage.propTypes = {
    post: PropTypes.object,
    refreshPage: PropTypes.func

};
export default PostOnFeedPage;