export function submitContactForm(name, email, message) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    fetch('/contact', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch({
            type: 'SUBMIT_CONTACT_FORM_SUCCESS',
            messages: [json]
          });
        });
      } else {
        response.json().then((json) => {
          dispatch({
            type: 'SUBMIT_CONTACT_FORM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
