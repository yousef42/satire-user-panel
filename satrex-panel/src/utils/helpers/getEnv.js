const getEnv = () => 'satrex';
// const getEnv = () => (process.env.NODE_ENV === 'production' ? (window.location.origin).split('.')[1] : 'narwhal');

export default getEnv;
