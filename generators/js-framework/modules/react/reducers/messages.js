export default function messages(state = {}, action) {
  switch (action.type) {
    case 'CONTACT_FORM_FAILURE':
      return {
        error: action.messages
      };
    case 'CONTACT_FORM_SUCCESS':
      return {
        success: action.messages
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
