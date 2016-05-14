import 'isomorphic-fetch'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
import { expect } from 'chai';
import * as actions from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN_SUCCESS action when login form is submitted', () => {
    fetchMock.mock('/login', 'POST', {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS5kb21haW4uY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6IjE0NjMyNTU0MjYiLCJleHAiOiIxNDYzODYxMjIyIn0.Cchy4zAn7-mPdUu1BXzeIG8x3cvQztszI2faWGETTEE',
      user: {
        id: '01234567890',
        name: 'John Doe',
        email: 'john@gmail.com',
        location: 'San Francisco'
      }
    });

    const stub = sinon.stub(browserHistory, 'push', () => { return true; });


    const expectedActions = [
      { type: 'CLEAR_MESSAGES' },
      {
        type: 'LOGIN_SUCCESS',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS5kb21haW4uY29tIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6IjE0NjMyNTU0MjYiLCJleHAiOiIxNDYzODYxMjIyIn0.Cchy4zAn7-mPdUu1BXzeIG8x3cvQztszI2faWGETTEE',
        user: {
          id: '01234567890',
          name: 'John Doe',
          email: 'john@gmail.com',
          location: 'San Francisco'
        }
      }];

    const store = mockStore({});

    return store.dispatch(actions.login())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
