const currentHost = window.location.hostname;
const config = {
    "protocol":currentHost=== 'localhost'? "ws://" : "wss://",
    "host":currentHost,
    "port":currentHost === 'localhost'? ':8011' : '',
    "auth_url": "http://localhost:8010/api/users/v1/login",
};
export default config;