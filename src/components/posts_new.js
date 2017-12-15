import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component{
  static contextTypes = {
    router : PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props)
    .then(() => {
      // 블로그 포스트가 생성되고 유저가 index로 네비게이팅 한다.
      // this.context.router.push를 호출하여 새로운 패스로 네비게이팅 한다.
      this.context.router.push('/');
    });
  }

  render(){
    //const handleSubmit = this.props.handleSubmit;
    const { fields:{title,categories, content}, handleSubmit } = this.props;
    //const title = this.props.fields.title;
    //const categories = this.props.categories.title;
    //const content = this.props.content.title;

    const isDanger = (kind) => {
      return kind.touched && kind.invalid ? 'has-danger' : '';
    }
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${isDanger(title)}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${isDanger(categories)}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${isDanger(content)}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className = "btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.title){
    errors.title = 'Enter a username';
  }

  if(!values.categories){
    errors.categories = 'Enter a categories';
  }

  if(!values.content){
    errors.content = 'Enter a content';
  }
  return errors;
}

// connect의 첫번째 요소는 mapStateToProps이고 두번째는 mapDispatchToProps
// reduxForm의 첫번째 요소는 form config이고 두번째는 mapStateToProps이고 세번째는 mapDispatchToProps이다

// this.props.폼리덕스 관련은 여기 헬퍼에 의해서 주입됨
export default reduxForm({
  form:'PostsNewForm',
  fields: ['title','categories','content'],
  validate
}, null, {createPost})(PostsNew);

// 인풋이 변할 때 마다 여기서는 PostsNewForm의 필드 값에 글로벌 어플리케이션 스테이트로
// 세팅이 된다.
// 리덕스 폼은 컴포넌트 레벨 스테이트를 글로벌 레벨 스테이트로 저장할 수 있도록 해준다.
