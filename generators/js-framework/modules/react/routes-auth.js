<Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
<Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
<Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
<Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
<Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
