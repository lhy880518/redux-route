import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPost, deletePost }  from '../actions/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class PostsShow extends Component{
  constructor(props){
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  static contextTypes = {
    router : PropTypes.object
  };


  onDeleteClick(){
    this.props.deletePost(this.props.params.id).then(() => {
      // 블로그 포스트가 생성되고 유저가 index로 네비게이팅 한다.
      // this.context.router.push를 호출하여 새로운 패스로 네비게이팅 한다.
      this.context.router.push('/');
    });
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }
  render(){
    const post = this.props.post;

    if(!post){
      return (
        <div>
          <img width="30" height="30" src='/style/Loading.gif'/>
        </div>
      );
    }

    return(
      <div>
        <Link to="/" >Back To Index</Link>
        <button className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}>
          DeletePost
        </button>
        <h3>{post.title}</h3>
        <h6>Categories : {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    post:state.posts.post
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPost, deletePost}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(PostsShow);
