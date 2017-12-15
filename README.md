# My Redux Ex

## how start?
```
> npm install
> npm start
```
# react-router?
리액트에서 라우팅 처리를 위한 모듈

# browserHistory
http://www.test.com/posts/5
http://www.test.com/이후 url 변경 시 감지가능

# hashHistory
http://www.test.com/#posts/5
http://www.test.com/#이후 url 변경 시 감지가능

# IndexRoute
IndexRoute는 Route첯럼 행동하지만, 해당 Url을 자식이 아닌
부모인 path만 매치시킨다.
```
<Route path="/" component={App} >
  <IndexRoute component={PostsIndex} />
  <Route path="greet" component={Greeting} />
</Route>
```
여기서 /진입 시 부모인 App과 IndexRoute인 PostsIndex가 기본 라우트로 보여지게 된다.

# redux-form
