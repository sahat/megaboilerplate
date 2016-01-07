import React from 'react';
import { Router, Route, Link } from 'react-router'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-1 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="widget">
                <h6 className="title">Recent Posts</h6>
                <ul className="link-list recent-posts">
                  <li>
                    <a href="#">Hugging pugs is super trendy</a>
                                        <span className="date">February
                                            <span className="number">14, 2015</span>
                                        </span>
                  </li>
                  <li>
                    <a href="#">Spinning vinyl is oh so cool</a>
                                        <span className="date">February
                                            <span className="number">9, 2015</span>
                                        </span>
                  </li>
                  <li>
                    <a href="#">Superior theme design by pros</a>
                                        <span className="date">January
                                            <span className="number">27, 2015</span>
                                        </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="widget">
                <h6 className="title">Latest Updates</h6>
                <div className="twitter-feed">
                  <div className="tweets-feed" data-widget-id="492085717044981760" id="tweets-0">
                    <ul className="slides">
                      <li>
                        <div className="user">
                          <a href="https://twitter.com/mrareweb" aria-label="Medium Rare (screen name: mrareweb)"
                             data-scribe="element:user_link">
                            <img alt=""
                                 data-src-1x="https://pbs.twimg.com/profile_images/588890128409473024/6mECDeLZ_normal.png"
                                 data-src-2x="https://pbs.twimg.com/profile_images/588890128409473024/6mECDeLZ_bigger.png"
                                 data-scribe="element:avatar"/>
    <span>

      <span data-scribe="element:name">Medium Rare</span>
    </span>
                            <span data-scribe="element:screen_name">@mrareweb</span>

                          </a>
                        </div>
                        <p className="tweet">Thanks <a href="https://twitter.com/peternixey"
                                                       data-mentioned-user-id="2864051" data-scribe="element:mention">@peternixey</a>!
                          Great to hear :) Variant relies on browser storage. Just export to a .variant file and you
                          will never lose your work :)</p><p className="timePosted">Posted on 21 Oct</p><p
                        className="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=656848764875902976"
                                                className="twitter_reply_icon">Reply</a><a
                        href="https://twitter.com/intent/retweet?tweet_id=656848764875902976"
                        className="twitter_retweet_icon">Retweet</a><a
                        href="https://twitter.com/intent/favorite?tweet_id=656848764875902976"
                        className="twitter_fav_icon">Favorite</a></p></li>



                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">

            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <span className="sub">© 2016 Sahat Yalkabov</span>
            </div>
            <div className="col-sm-6 text-right">
              <ul className="list-inline social-list">
                <li>
                  <a href="#">
                    <i className="ti-twitter-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ti-vimeo-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a className="btn btn-sm fade-half back-to-top inner-link" href="#top">Top</a>
      </footer>
    );
  }
}

export default Footer;
