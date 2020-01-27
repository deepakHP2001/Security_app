const generateActions = function(actions) {
  const actionMap = {};
  for (const i in actions) {
    const action = actions[i];
    actionMap[action] = action;
    actionMap[`${action}_BEGIN`] = `${action}_BEGIN`;
    actionMap[`${action}_DONE`] = `${action}_DONE`;
    actionMap[`${action}_FAIL`] = `${action}_FAIL`;
  }
  return actionMap;
};

export default generateActions([
  'LOGIN',
  'LOGOUT',
  'SEND_OTP',
  'VERIFY_OTP',
  'RESEND_OTP',
]);

export const CHANGE_ROUTE_COMPONENT = 'CHANGE_ROUTE_COMPONENT';

